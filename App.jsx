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

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={{version: 2}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="myPage" component={MyProfileScreen} />
            <Stack.Screen name="orderInfo" component={OrderInfo} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
