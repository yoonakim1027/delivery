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

const store = configureStore({
  reducer: rootReducer,
});
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="myPage" component={MyProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
