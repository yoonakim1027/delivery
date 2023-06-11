import axios from 'axios';
import {apiServer} from '../../../server.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isTokenRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isTokenRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isTokenRefreshing = true;

      const refreshToken = await AsyncStorage.getItem('refreshToken');
      return new Promise(function (resolve, reject) {
        axios
          .get(`${apiServer}/login`, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: `${refreshToken}`,
            },
          })
          .then(async response => {
            await AsyncStorage.setItem(
              'accessToken',
              response.data.accessToken,
            );
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.accessToken}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.data.accessToken}`;
            processQueue(null, response.data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isTokenRefreshing = false;
          });
      });
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
