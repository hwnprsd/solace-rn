import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
// import * as solana from '@solana/web3.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SmsRetriever from 'react-native-sms-retriever';
import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';
import BackgroundTask from 'react-native-background-task';
export type Props = {
  navigation: any;
};
BackgroundTask.define(() => {
  console.log('Hello from a background task');
  BackgroundTask.finish();
});

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [sms, setSms] = useState('');
  // console.log(solana);
  // const _onSmsListenerPressed = async () => {
  //   try {
  //     const registered = await SmsRetriever.startSmsRetriever();
  //     if (registered) {
  //       console.log('registered', registered);
  //       SmsRetriever.addSmsListener(event => {
  //         console.log('Message', event.message);
  //         SmsRetriever.removeSmsListener();
  //       });
  //     }
  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // };
  const checkStatus = async () => {
    const status = await BackgroundTask.statusAsync();
    console.log('STATUS', status);
    if (status.available) {
      // Everything's fine
      return;
    }

    const reason = status.unavailableReason;
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert(
        'Denied',
        'Please enable background "Background App Refresh" for this app',
      );
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert(
        'Restricted',
        'Background tasks are restricted on your device',
      );
    }
  };
  useEffect(() => {
    console.log('CHECKING_++++++++>>>>>');
    BackgroundTask.schedule({
      period: 1800, // Aim to run every 30 mins - more conservative on battery
    });
    checkStatus();
  });

  useEffect(() => {
    const filter = {
      box: '',
      read: 1,
      indexFrom: 0,
      maxCount: 10,
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: any) => {
        console.log('Failed with this error: ' + fail);
      },
      (count: any, smsList: any) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        // var arr = JSON.parse(smsList);

        // arr.forEach(function (object: any) {
        //   console.log('Object: ' + object);
        //   console.log('-->' + object.date);
        //   console.log('-->' + object.body);
        // });r
      },
    );
    console.log('listening');
    // _onSmsListenerPressed();
    const sub = SmsListener.addListener((message: any) => {
      console.log('here', message);
      setSms(message.body);
    });
    return () => {
      console.log('not listening');
      sub.remove();
    };
  }, []);

  const getData = async () => {
    const data = await AsyncStorage.getItem('passcode');
    console.log('DATA: ', data);
  };

  getData();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/images/solace/solace-icon.png')}
          />
          <Text style={styles.logo}>Solace</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={() => _onSmsListenerPressed()}
            style={[
              styles.buttonStyle,
              styles.createButton,
              {marginBottom: 10},
            ]}>
            <Text style={styles.buttonTextStyle}>{sms}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Email')}
            style={[styles.buttonStyle, styles.createButton]}>
            <Text style={styles.buttonTextStyle}>create new wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Email')}
            style={[styles.buttonStyle, styles.secondButton]}>
            <Text style={[styles.buttonTextStyle, styles.secondButtonText]}>
              recover your wallet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
