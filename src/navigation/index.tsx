import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../state/contexts/GlobalContext';
import AuthStack from './Auth';
import WalletStack from './Wallet';
import OnboardingStack from './Onboarding';

const Navigation = () => {
  const {state} = useContext(GlobalContext);

  const renderContent = () => {
    if (state.onboarded) {
      if (state.user) {
        return <WalletStack />;
      } else {
        return <AuthStack />;
      }
    }
    return <OnboardingStack />;
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default Navigation;
