// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/pages/Home';
import LoginScreen from './src/pages/Login';
import MyProfileScreen from './src/pages/MyPage';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './src/utils/store/reducers/rootReducer';
import OrderInfo from './src/pages/TodayRoute/OrderInfo';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import NavigationService from './src/utils/Navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({
  reducer: rootReducer,
});
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    myOwnColor: '#BADA55',
  },
};

const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('token');
  return !!token;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setNavigator(navigatorRef);
          initialState = {
            isLoggedIn: false, // 초기 상태는 로그인되지 않은 상태로 설정
          };
          fallback = {
            /* 로딩 컴포넌트 설정 */
          };
        }}>
        <PaperProvider theme={{version: 2}}>
          <Stack.Navigator>
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="myPage" component={MyProfileScreen} />
                <Stack.Screen name="orderInfo" component={OrderInfo} />
              </>
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false, // 로그인 화면에서 헤더 숨김
                  gestureEnabled: false, // 로그인 화면에서 뒤로가기 제스처 비활성화
                }}
              />
            )}
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
