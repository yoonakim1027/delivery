import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from '../TodayRoute';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Text, Button} from 'react-native-paper';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태를 관리하기 위한 상태 변수

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      setLoggedIn(!!token);
    };

    checkLoggedIn();
  }, []); // 컴포넌트가 마운트되었을 때 한 번만 실행되도록 []

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: theme.colors.primary}}>Home</Text>
      {loggedIn ? (
        <View>
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
