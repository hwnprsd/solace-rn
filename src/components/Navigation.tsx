import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home';
import EmailScreen from './screens/Email';
import CheckMailScreen from './screens/CheckMail';
import PhoneScreen from './screens/PhoneScreen';
import UsernameScreen from './screens/Username';
import GoogleDriveScreen from './screens/GoogleDrive';
import WalletScreen from './screens/Wallet';
import PasscodeScreen from './screens/Passcode';
import ConfirmPasscodeScreen from './screens/ConfirmPasscode';
import MainPasscodeScreen from './screens/MainPasscode';
import FingerprintScreen from './screens/Figerprint';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Fingerprint"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="CheckMail" component={CheckMailScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Username" component={UsernameScreen} />
        <Stack.Screen name="Passcode" component={PasscodeScreen} />
        <Stack.Screen
          name="ConfirmPasscode"
          component={ConfirmPasscodeScreen}
        />
        <Stack.Screen name="GoogleDrive" component={GoogleDriveScreen} />
        <Stack.Screen name="MainPasscode" component={MainPasscodeScreen} />
        <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
