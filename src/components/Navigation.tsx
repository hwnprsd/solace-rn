import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import EmailScreen from './screens/EmailScreen';
import CheckMailScreen from './screens/CheckMailScreen';
import PhoneScreen from './screens/PhoneScreen';
import UsernameScreen from './screens/UsernameScreen';
import GoogleDriveScreen from './screens/GoogleDriveScreen';
import WalletScreen from './screens/WalletScreen';
import PasscodeScreen from './screens/Passcode';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Passcode"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="CheckMail" component={CheckMailScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Username" component={UsernameScreen} />
        <Stack.Screen name="Passcode" component={PasscodeScreen} />
        <Stack.Screen name="GoogleDrive" component={GoogleDriveScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
