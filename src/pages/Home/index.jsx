import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from '../TodayRoute';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태를 관리하기 위한 상태 변수

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      const isLoggedIn = !!token; // 토큰이 있는 경우 true, 없는 경우 false
      setLoggedIn(isLoggedIn);
    };

    checkLoggedIn();
  }, []);
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View>
          <Image
            style={{height: 100}}
            resizeMode={'contain'}
            source={require('../../assets/images/banner.png')}
          />
          <Route navigation={navigation} />
        </View>
      ) : (
        <Text>Please login to view profile</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
