import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from '../TodayRoute';
import MyProfile from '../MyPage';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Text, Button} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const theme = useTheme();

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  };

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: theme.colors.primary}}>Home</Text>
      {isLoggedIn() ? (
        <View>
          <View>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('myPage')}>
              My Profile
            </Button>
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
