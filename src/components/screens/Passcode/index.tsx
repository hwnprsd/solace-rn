import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';

export type Props = {
  navigation: any;
};

const PasscodeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            choose a passcode to protect your wallet on this device
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Phone')}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PasscodeScreen;
