import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export type Props = {
  navigation: any;
};

const UsernameScreen: React.FC<Props> = ({navigation}) => {
  const [text, setText] = useState('');
  const [borderColor, setBorderColor] = useState('#fff3');
  const [infoText, setInfoText] = useState('your username will be public');

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>your solace username</Text>
          <Text style={styles.subHeading}>
            choose a username that others can use to send you money
          </Text>
          <TextInput
            style={[styles.textInput, {borderColor}]}
            placeholder="username"
            placeholderTextColor="#fff6"
            value={text}
            autoCorrect={false}
            autoCapitalize={'none'}
            onFocus={() => setBorderColor('#fff6')}
            onBlur={() => setBorderColor('#fff3')}
            onChangeText={setText}
          />
          <View style={styles.subTextContainer}>
            <AntDesign name="infocirlceo" style={styles.subIcon} />
            <Text style={styles.subText}>{infoText}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Passcode')}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UsernameScreen;
