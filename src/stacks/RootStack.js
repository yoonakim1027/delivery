import React from 'react';
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import MyProfile from '../pages/MyPage';
const Stack = createNativeStackNavigator();

function RootStack() {
  //Slide from right animation
  let SlideFromRight = (index, position, width) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0],
    });
    const slideFromRight = {transform: [{translateX}]};
    return slideFromRight;
  };

  //Transition configurations for createStackNavigator
  const TransitionConfiguration = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const width = layout.initWidth;
        const {index} = scene;
        return SlideFromRight(index, position, width);
      },
    };
  };

  const config = {
    animation: 'spring',
    config: {
      damping: 1500,
      mass: 1,
      stiffness: 50000,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      speed: 12,
      tension: 100,
      delay: 3000,
    },
  };
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName="Main"
      activeColor="#e91e63"
      labelStyle={{fontSize: 12}}
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
        // animation: 'slide_from_left',
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forFade,
        transitionConfig: TransitionConfiguration,
      }}>
      <Stack.Screen
        name="Main" // HomeStack 네비게이터의 이름을 지정합니다.
        component={HomeStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="myPage" component={MyProfile} /> */}
    </Stack.Navigator>
  );
}

export default RootStack;
