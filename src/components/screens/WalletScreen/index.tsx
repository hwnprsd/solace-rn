import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Transaction from '../../wallet/Transaction';

export type Props = {
  navigation: any;
};

const WalletScreen: React.FC<Props> = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      date: new Date(),
      username: 'ashwin.solace.money',
    },
    {
      id: 2,
      date: new Date(),
      username: 'ankit.solace.money',
    },
    {
      id: 3,
      date: new Date(),
      username: 'ashwin.solace.money',
    },
    {
      id: 4,
      date: new Date(),
      username: 'ankit.solace.money',
    },
    {
      id: 5,
      date: new Date(),
      username: 'ashwin.solace.money',
    },
    {
      id: 6,
      date: new Date(),
      username: 'ankit.solace.money',
    },
    {
      id: 7,
      date: new Date(),
      username: 'ashwin.solace.money',
    },
    {
      id: 8,
      date: new Date(),
      username: 'ankit.solace.money',
    },
    {id: 9, username: 'sethi.solace.money', date: new Date()},
  ];

  const renderItem = ({item}: {item: any}) => {
    return <Transaction item={item} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} bounces={false}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainText}>S</Text>
        <Text style={styles.username}>ankit.solace.money</Text>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.price}>$0.04</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.iconBackground}>
              <AntDesign name="arrowup" size={20} color="black" />
            </View>
            <Text style={styles.buttonText}>send</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.iconBackground}>
              <AntDesign name="arrowdown" size={20} color="black" />
            </View>
            <Text style={styles.buttonText}>recieve</Text>
          </View>
        </View>
      </View>
      <View style={styles.walletContainer}>
        <View style={styles.walletHeader}>
          <Text style={styles.heading}>wallet activity</Text>
          <Text style={styles.sideHeading}>see more</Text>
        </View>
        <ScrollView>
          {DATA.map((item: any) => {
            return <Transaction key={item.id} item={item} />;
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
