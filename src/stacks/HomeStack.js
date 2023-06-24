// HomeStack.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../pages/Home';
import MyPage from '../pages/MyPage';
import OrderInfo from '../pages/TodayRoute/OrderInfo';
import Route from '../pages/TodayRoute';
import DeliveryLogout from '../utils/Auth/DeliveryLogout';

const Stack = createStackNavigator();

function HomeStack({navigation}) {
  const handleLogout = async () => {
    await DeliveryLogout(navigation); // DeliveryLogout 함수에 navigation 전달
  };
  return (
    <Stack.Navigator
      initialRouteName="main"
      activeColor="#e91e63"
      labelStyle={{fontSize: 12}}
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="main"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon
                name="user"
                size={30}
                onPress={() => navigation.navigate('myPage')}
              />
              <Icon
                name="logout"
                size={30}
                style={{marginLeft: 10}}
                onPress={handleLogout}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="myPage" component={MyPage} />
      <Stack.Screen name="route" component={props => <Route {...props} />} />
      <Stack.Screen name="orderInfo" component={OrderInfo} />
    </Stack.Navigator>
  );
}

export default HomeStack;
