import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../state/contexts/GlobalContext';
import AuthStack from './Auth';
import WalletStack from './Wallet';

const Navigation = () => {
  const {state} = useContext(GlobalContext);

  const renderContent = () => {
    if (state.user) {
      return <WalletStack />;
    }
    return <AuthStack />;
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default Navigation;
