import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';

export type Props = {
  navigation: any;
};

const CheckMailScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>mail icon</Text>
          <Text style={styles.heading}>check you mail</Text>
          <Text style={styles.subHeading}>
            please tap the link we sent to ankitzethi@gmail.com
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Phone')}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>open mail app</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckMailScreen;
