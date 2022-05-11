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
            style={styles.textInput}
            placeholder="username"
            placeholderTextColor="#fff6"
            value={text}
            onChangeText={setText}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 4,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <AntDesign name="windows" style={{color: 'red'}} />
            <Text style={{color: 'gray', fontFamily: 'Poppins-SemiBold'}}>
              {infoText}
            </Text>
          </View>
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

export default UsernameScreen;
