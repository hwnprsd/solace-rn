import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPasscodeScreen from '../components/screens/MainPasscode';
import FingerprintScreen from '../components/screens/Figerprint';
import WalletScreen from '../components/screens/Wallet';
import SendScreen from '../components/screens/Wallet/Send';
import AddContactScreen from '../components/screens/Wallet/AddContact';
import ContactScreen from '../components/screens/Wallet/Contact';

const Stack = createNativeStackNavigator();

const WalletStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainPasscode" component={MainPasscodeScreen} />
      <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Send" component={SendScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default WalletStack;
