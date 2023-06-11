import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../pages/Home';
import MyPage from '../pages/MyPage';
import OrderInfo from '../pages/TodayRoute/OrderInfo';
import Route from '../pages/TodayRoute';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      activeColor="#e91e63"
      labelStyle={{fontSize: 12}}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="main" component={HomeScreen} />
      <Stack.Screen name="myPage" component={MyPage} />
      <Stack.Screen name="route" component={props => <Route {...props} />} />

      <Stack.Screen name="orderInfo" component={OrderInfo} />
    </Stack.Navigator>
  );
}

export default HomeStack;
