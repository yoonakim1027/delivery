import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiServer} from '../../../server.config';
import axiosInstance from '../../utils/Auth/RefreshToken';

export const fetchOrderData = async id => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await axiosInstance.get(`${apiServer}/order/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('주문 상세 데이터 가져오기 실패:', error);
    return null;
  }
};
