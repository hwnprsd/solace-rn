
import React, { useContext } from 'react';
import { AccountStatus, GlobalContext } from '../state/contexts/GlobalContext';
import AuthStack from './Auth';
import WalletStack from './Wallet';
import OnboardingStack from './Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';


const Navigation = () => {
  const { state } = useContext(GlobalContext);

  const renderContent = () => {
    switch (state.accountStatus) {
      case AccountStatus.NEW:
        return <OnboardingStack />;
      case AccountStatus.EXISITING:
        // return <AuthStack />;
        return <WalletStack />;

      case AccountStatus.ACTIVE:
        return <WalletStack />;
    }
  };

  const renderLoading = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
        <Text style={{ fontSize: 20, color: "white" }}> <ActivityIndicator color={"#fff"} style={{ paddingRight: 6, paddingTop: 6 }} />  Processing, please wait</Text>
      </View>
    )
  }

  return <NavigationContainer>{state.isLoading ? renderLoading() : renderContent()}</NavigationContainer>;
};

export default Navigation;
