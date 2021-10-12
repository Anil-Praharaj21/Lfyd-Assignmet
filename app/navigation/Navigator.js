import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const Navigator = rest => {
  const [loginPage, showLoginPage] = useState(false);

  return (
    <Stack.Navigator>
      {!loginPage ? (
        <Stack.Screen
          name="Splash"
          options={{
            headerShown: false,
          }}>
          {props => <SplashScreen showLogin={value => showLoginPage(value)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}>
          {props => <LoginScreen {...rest} {...props} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
