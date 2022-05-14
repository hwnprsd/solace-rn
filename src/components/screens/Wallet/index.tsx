import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import styles from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Transaction from '../../wallet/Transaction';
import { SolaceSDK } from '../../../solace/sdk';
import * as anchor from '../../../dist/browser';
import * as anchor2 from '../../../@project-serum/anchor'
import * as anchor3 from '@project-serum/anchor'
import { ApiProvider } from '../../../solace/api';
import * as IDL from '../../../solace/solace/idl.json';
import { clusterApiUrl, Connection, PublicKey,  } from '@solana/web3.js';
import { Solace } from '../../../solace/solace/types';
import NodeWallet from '../../../solace-wallet';

const { Program } = anchor2;
const { Keypair } = anchor2.web3;

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
        <Image
          source={require('../../../../assets/images/solace/solace-icon.png')}
          style={styles.image}
        />
        <Text style={styles.username}>ankit.solace.money</Text>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.price}>$0.04</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.iconBackground}>
              <AntDesign name="arrowup" size={20} color="black" />
            </View>
            <Text style={styles.buttonText}>send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}
          onPress={async () => {
            const guardian = Keypair.generate();
            const ownerKeypair = Keypair.fromSecretKey(Uint8Array.from([
              64,49,21,122,173,218,147,45,207,84,138,105,6,50,18,81,174,246,20,171,195,135,70,222,225,154,217,74,218,186,191,197,49,170,69,11,200,3,223,9,39,74,201,163,68,222,53,183,52,220,243,79,228,240,168,172,218,155,91,56,123,136,222,143
            ]))
            const wallet = new NodeWallet(ownerKeypair)
            // const provider = new anchor2.Provider(new Connection('http://127.0.0.1:8899'),wallet, {
            const provider = new anchor2.Provider(new Connection(clusterApiUrl('testnet')),wallet, {
              commitment: 'confirmed' 
            });
            const solaceIdl = IDL as Solace;
            const program = new Program(solaceIdl, new PublicKey('8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U'), provider);
            const sdk = new SolaceSDK(new ApiProvider('https://localhost:3000'), program, wallet.payer);
            await sdk.createWalletWithName(wallet.payer, 'ashwin.solace');

            await sdk.addGuardian(guardian.publicKey);
          }} 
          >
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons
                name="line-scan"
                size={20}
                color="black"
              />
            </View>
            <Text style={styles.buttonText}>scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.iconBackground}>
              <AntDesign name="arrowdown" size={20} color="black" />
            </View>
            <Text style={styles.buttonText}>recieve</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.walletContainer}>
        <View style={styles.walletHeader}>
          <Text style={styles.heading}>wallet activity</Text>
          <TouchableOpacity>
            <Text style={styles.sideHeading}>see more</Text>
          </TouchableOpacity>
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
