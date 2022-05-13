import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import styles from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign';

export type Props = {
  navigation: any;
};

const SendScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.mainText}>send</Text>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" style={styles.searchIcon} />
        <View style={styles.inputWrap}>
          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            style={styles.textInput}
            placeholderTextColor="#9999a5"
            placeholder="username or address"
          />
        </View>
        <View style={styles.sendGiftContainer}>
          <AntDesign name="gift" style={styles.giftIcon} />
          <Text style={styles.buttonText}>send a gift</Text>
        </View>
      </View>
      <View style={styles.sendContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/solace/send-money.png')}
            style={styles.contactImage}
          />
          <Text style={styles.buttonText}>
            <Text style={styles.secondaryText}>add a contact</Text> to send to
            Solace or Solana addresses
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SendScreen;
