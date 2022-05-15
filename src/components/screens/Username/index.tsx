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
import { setIsLoading, setOnboardingUser, setUser, setUserSeed } from '../../../state/actions/global';
import { Keypair } from '@solana/web3.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Props = {
  navigation: any;
};

const UsernameScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [borderColor, setBorderColor] = useState('#fff3');
  const [infoText, setInfoText] = useState('your username will be public');

  const { state, dispatch } = useContext(GlobalContext);


  const handleUsernameSubmit = async () => {
    dispatch(setIsLoading(true))
    dispatch(setOnboardingUser({ ...state.onboardingUser, username }));
    if (state.solObj) {
      if (state.userKeypair !== undefined) {
        const ownerKeypair = Keypair.fromSecretKey(Uint8Array.from([
          24, 141, 66, 67, 249, 232, 46, 87, 146, 92, 202,
          113, 218, 170, 117, 12, 64, 36, 34, 9, 248, 17,
          124, 45, 90, 66, 12, 170, 28, 203, 105, 186, 42,
          196, 231, 116, 215, 234, 255, 198, 149, 28, 113, 45,
          198, 192, 110, 207, 115, 18, 6, 49, 160, 10, 212,
          55, 171, 129, 46, 213, 228, 167, 128, 111
        ]))
        console.log(ownerKeypair.publicKey.toString())
        try {
          await state.solObj.createWalletWithName(ownerKeypair, username)
          const seed = state.solObj.seed.toString()
          if (seed)
            console.log(seed, "SEED BB")
          await AsyncStorage.setItem("userSeed", seed)
          dispatch(setUserSeed(seed))
          dispatch(setIsLoading(false))
        } catch (err) {
          console.log(err)
        }
      }
      navigation.navigate('Passcode');


    }
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
          style={styles.buttonStyle}

        >
          <Text style={styles.buttonTextStyle}>next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UsernameScreen;
