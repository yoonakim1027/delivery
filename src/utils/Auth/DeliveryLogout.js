import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryLogout = async navigation => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');

    console.log('로그아웃 성공');
    navigation.navigate('Login');
  } catch (err) {
    console.log('로그아웃 실패:', err);
  }
};

export default DeliveryLogout;
