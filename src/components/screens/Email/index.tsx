import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

export type Props = {
  navigation: any;
};

const EmailScreen: React.FC<Props> = ({navigation}) => {
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>enter email</Text>
          <Text style={styles.subHeading}>
            we’ll notify you of important or suspicious activity on your wallet
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="email address"
            placeholderTextColor="#fff6"
            value={text}
            onChangeText={setText}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CheckMail')}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmailScreen;
