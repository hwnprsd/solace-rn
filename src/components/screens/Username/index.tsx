import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GlobalContext} from '../../../state/contexts/GlobalContext';
import {setOnboardingUser, setUser} from '../../../state/actions/global';

export type Props = {
  navigation: any;
};

const UsernameScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [borderColor, setBorderColor] = useState('#fff3');
  const [infoText, setInfoText] = useState('your username will be public');

  const {state, dispatch} = useContext(GlobalContext);

  const handleUsernameSubmit = () => {
    dispatch(setOnboardingUser({...state.onboardingUser, username}));
    navigation.navigate('Passcode');
  };

  const handleChange = (text: string) => {
    setUsername(text);
  };
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
            value={username}
            autoCorrect={false}
            autoCapitalize={'none'}
            onFocus={() => setBorderColor('#fff6')}
            onBlur={() => setBorderColor('#fff3')}
            onChangeText={text => handleChange(text)}
          />
          <View style={styles.subTextContainer}>
            <AntDesign name="infocirlceo" style={styles.subIcon} />
            <Text style={styles.subText}>{infoText}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleUsernameSubmit();
          }}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UsernameScreen;
