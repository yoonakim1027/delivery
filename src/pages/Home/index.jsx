import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from '../TodayRoute';
import MyProfile from '../MyPage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {isLoggedIn ? (
        <View>
          <View>
            <Button
              title="My Profile"
              onPress={() => navigation.navigate('myPage')}></Button>
          </View>

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
