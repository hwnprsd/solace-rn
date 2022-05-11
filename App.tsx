import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CheckMailScreen from './src/components/screens/CheckMailScreen';
import EmailScreen from './src/components/screens/EmailScreen';
import HomeScreen from './src/components/screens/HomeScreen';
import PhoneScreen from './src/components/screens/PhoneScreen';
import UsernameScreen from './src/components/screens/UsernameScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="CheckMail" component={CheckMailScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Username" component={UsernameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
