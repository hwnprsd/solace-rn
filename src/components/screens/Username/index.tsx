import React, { useContext, useState } from 'react';


import styles from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { GlobalContext } from '../../../state/contexts/GlobalContext';
import { setOnboardingUser, setUser } from '../../../state/actions/global';
import { Keypair } from '@solana/web3.js';

export type Props = {
  navigation: any;
};

const UsernameScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [borderColor, setBorderColor] = useState('#fff3');
  const [infoText, setInfoText] = useState('your username will be public');

  const { state, dispatch } = useContext(GlobalContext);


  const handleUsernameSubmit = async () => {
    dispatch(setOnboardingUser({ ...state.onboardingUser, username }));
    if (state.solObj) {
      if (state.user?.keyPair !== undefined) {
        // const owner = Keypair.fromSecretKey(Buffer.from(state.user?.keyPair))
        const owner = Keypair.generate()
        try {
          await state.solObj.createWalletWithName(owner, username)

        } catch (err) {
          console.log(err)
        }
        // console.log(state.solObj.seed.toString())
        //  dispatch(setUser(state.solObj.seed.toString()))
        //  dispatch(setOnboardingUser({...state.onboardingUser, state.solObj.seed.toString()}));

      }

    }
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
            style={[styles.textInput, { borderColor }]}
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
            {/* <AntDesign name="infocirlceo" style={styles.subIcon} /> */}
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
