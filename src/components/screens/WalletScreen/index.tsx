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
      <View style={[styles.headingContainer, {flex: 0.5}]}>
        <Text style={styles.mainText}>S</Text>
        <Text style={styles.usernameText}>ankit.solace.money</Text>
      </View>
      <View style={[styles.headingContainer, {flex: 0.5, width: '80%'}]}>
        <Text style={styles.priceText}>$0.04</Text>
        <View
          style={{
            flex: 1,
            width: '60%',
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              <AntDesign name="arrowup" size={20} color="black" />
            </View>
            <Text style={{color: 'white', marginTop: 12}}>send</Text>
          </View>
          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              <AntDesign name="arrowdown" size={20} color="black" />
            </View>
            <Text style={{color: 'white', marginTop: 12}}>recieve</Text>
          </View>
        </View>
        {/* <Text style={styles.usernameText}>ankit.solace.money</Text> */}
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 40,
          width: '90%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
            wallet activity
          </Text>
          <Text
            style={{
              color: '#9999A5',
              fontSize: 14,
              fontFamily: 'SpaceMono-Bold',
            }}>
            see more
          </Text>
        </View>
        <ScrollView>
          {DATA.map((item: any) => {
            return <Transaction key={item.id} item={item} />;
          })}
          {/* <FlatList
            data={DATA}
            // horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          /> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
