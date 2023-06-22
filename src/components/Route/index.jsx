import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiServer} from '../../../server.config';
import axiosInstance from '../../utils/Auth/RefreshToken';

export const fetchRouteData = async () => {
  const token = await AsyncStorage.getItem('token');

  const latitude = 37.726751;
  const longitude = 126.705191;

  try {
    const response = await axiosInstance.get(
      `${apiServer}/route?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('배송관련 데이터 가져오기 실패:', error);
    return null;
  }
};
