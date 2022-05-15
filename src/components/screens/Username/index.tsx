import React, {useContext, useState} from 'react';

import styles from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {GlobalContext} from '../../../state/contexts/GlobalContext';
import {
  setOnboardingUser,
  setUser,
  setUserSeed,
} from '../../../state/actions/global';
import {Keypair} from '@solana/web3.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

export type Props = {
  navigation: any;
};

const UsernameScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [borderColor, setBorderColor] = useState('#fff3');
  const [isLoading, setIsLoading] = useState(false);
  const [infoText, setInfoText] = useState('your username will be public');

  const {state, dispatch} = useContext(GlobalContext);

  const handleUsernameSubmit = async () => {
    setIsLoading(true);
    dispatch(setOnboardingUser({...state.onboardingUser, username}));
    if (state.solObj) {
      if (state.userKeypair !== undefined) {
        const ownerKeypair = Keypair.fromSecretKey(
          Uint8Array.from([
            64, 49, 21, 122, 173, 218, 147, 45, 207, 84, 138, 105, 6, 50, 18,
            81, 174, 246, 20, 171, 195, 135, 70, 222, 225, 154, 217, 74, 218,
            186, 191, 197, 49, 170, 69, 11, 200, 3, 223, 9, 39, 74, 201, 163,
            68, 222, 53, 183, 52, 220, 243, 79, 228, 240, 168, 172, 218, 155,
            91, 56, 123, 136, 222, 143,
          ]),
        );
        try {
          await state.solObj.createWalletWithName(ownerKeypair, username);
          const seed = state.solObj.seed.toString();
          if (seed) {
            console.log(seed, 'SEED BB');
            await AsyncStorage.setItem('userSeed', seed);
            dispatch(setUserSeed(seed));
            setIsLoading(true);
          }
          navigation.navigate('Passcode');
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleChange = (text: string) => {
    setUsername(text);
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
          <Text style={{color: 'white', fontFamily: 'SpaceMono-Bold'}}>
            setting your username
          </Text>
        </View>
      ) : (
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
      )}
    </ScrollView>
  );
};

export default UsernameScreen;
