import axios from 'axios';
import {apiServer} from '../../../server.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../Navigation/NavigationService';
import DeliveryLogout from './DeliveryLogout';
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
  response => {
    return response;
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
        axiosInstance
          .post(
            `${apiServer}/refreshToken`,
            {},
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )
          .then(async response => {
            if (response.data.error) {
              // refreshToken expired, redirect to login page
              // navigation should be handled depending on your router library
              return;
            }
            await AsyncStorage.setItem('token', response.data.token);
            axiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.token}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.data.token}`;
            processQueue(null, response.data.token);
            resolve(axiosInstance(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            reject(err);
            DeliveryLogout();
            NavigationService.navigate('Login');
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
