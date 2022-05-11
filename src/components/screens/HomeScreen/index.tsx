import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';

export type Props = {
  navigation: any;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={require('../../../../assets/images/solace-icon.jpeg')}
          /> */}
          <Text style={styles.logo}>Solace</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Email')}
            style={[styles.buttonStyle, styles.createButton]}>
            <Text style={styles.buttonTextStyle}>create new wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Email')}
            style={[styles.buttonStyle, styles.secondButton]}>
            <Text style={[styles.buttonTextStyle, styles.secondButtonText]}>
              i have a solace wallet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
