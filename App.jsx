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
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import DeliveryLogout from './src/utils/Auth/DeliveryLogout';

const store = configureStore({
  reducer: rootReducer,
});
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    myOwnColor: '#BADA55',
  },
};

const App = () => {
  const handleLogout = async () => {
    await DeliveryLogout(NavigationService);
  };

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setNavigator(navigatorRef);
        }}>
        <PaperProvider theme={{version: 2}}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerRight: () => (
                  <View style={{flexDirection: 'row', marginRight: 10}}>
                    <Icon
                      name="user"
                      size={30}
                      onPress={() => NavigationService.navigate('myPage')}
                    />
                    <Icon
                      name="sign-out"
                      size={30}
                      style={{marginLeft: 10}}
                      onPress={handleLogout}
                    />
                  </View>
                ),
              }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen name="myPage" component={MyProfileScreen} />
            <Stack.Screen name="orderInfo" component={OrderInfo} />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
