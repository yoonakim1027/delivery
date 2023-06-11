import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './RefreshToken';
import {apiServer} from '../../../server.config';

const DeliveryLogin = async (id, password, navigation, setModalVisible) => {
  const body = {
    id: id,
    password: password,
  };

  try {
    const response = await axiosInstance.post(`${apiServer}/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {token, refreshToken} = response.data; // 백엔드에서 반환하는 accessToken과 refreshToken

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    console.log(token, refreshToken);
    console.log('로그인 성공');
    navigation.navigate('Home'); // 페이지 이동
  } catch (err) {
    console.log('로그인 실패:', err);
    setModalVisible(true); // 로그인 실패 시 모달 표시
  }
};

export default DeliveryLogin;
