
import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { Contact } from '../../components/wallet/ContactItem';
import { setAccountStatus, setSolaceObj, setUser, setUserKeypair, setUserProgram, setUserSeed } from '../actions/global';
import globalReducer from '../reducers/global';
import { SolaceSDK } from "../../solace-sdk/sdk";
import * as anchor from '../../@project-serum/anchor';
import { Program, Provider } from "../../@project-serum/anchor";
import IDL from "../../solace-sdk/solace/idl.json"
import { Solace } from "../../solace-sdk/solace/types";
import { NodeWallet } from '../../@project-serum/anchor/dist/cjs/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { ApiProvider } from '../../solace-sdk/api';


type InitialStateType = {
  accountStatus: AccountStatus;
  user?: User;
  program?: anchor.Program<Solace>,
  solObj?: SolaceSDK,
  userKeypair?: string,
  userSeed?: string,
  onboardingUser?: User;
  contact?: Contact;
  contacts?: Contact[];
  isLoading: boolean
};

export type User = {
  username?: string;
  email?: string;
  passcode?: string;
};

export enum AccountStatus {
  EXISITING = 'EXISITING',
  RECOVERY = 'RECOVERY',
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
}

const initialState = {
  isLoading: false,
  userKeypair: '',
  userSeed: '',
  accountStatus: AccountStatus.NEW,
  onboardingUser: {
    email: '',
    username: '',
    pascode: ''
  },

  contacts: [
    {
      id: new Date().getTime().toString() + Math.random().toString(),
      name: 'ashwin prasad',
      username: 'ashwin.solace.money',
      address: '1231jkajsdkf02198487',
    },
  ],
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => { } });

const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);


  /// GET local data
  const getLocalData = async (key: string) => {
    const res = await AsyncStorage.getItem("key")
    return res
  }

  /// Clear local data
  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (err) {
      console.log(err)
    }
  }

  /// Set Local data
  const setItem = async (key: string, item: any) => {
    try {
      await AsyncStorage.setItem(key, item)
    } catch (err) {
      console.log(err)
    }
  }


  /**
   * 
   * 1. If user exists then create instantiate solace for user
   * 2. If user is new, create a new keypair for user and set it locally
   */
  const getInitialData = async () => {

    await AsyncStorage.removeItem("user")
    await AsyncStorage.removeItem("userKeypair")
    await AsyncStorage.removeItem("userSeed")

    const userData = await AsyncStorage.getItem("user")
    const userKeypair = await AsyncStorage.getItem("userKeypair")
    const userSeed = await AsyncStorage.getItem("userSeed")

    console.log(userData, userKeypair, userSeed)
    console.log("after getting")
    if (userData !== null) {
      // if (userData)
      //   const user = JSON.parse(userData);

      // @ts-ignore
      // const owner = Keypair.fromSecretKey(Buffer.from(userKeypair))
      const owner = Keypair.generate()
      const wallet = new NodeWallet(owner)

      console.log(wallet.payer, "WALLET")

      const solaceIdl = IDL as Solace;
      const connection = new Connection(clusterApiUrl("testnet"))
      const program = new Program(solaceIdl, new anchor.web3.PublicKey('8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U'), new Provider(connection, wallet, { preflightCommitment: "confirmed" }));
      // if(!userSeed) 
      // const sol = SolaceSDK.fromSeed(userSeed, { program, owner: wallet.payer, apiProvider: new ApiProvider("") })

      const sol = new SolaceSDK({ program, owner: wallet.payer, apiProvider: new ApiProvider("") })

      await dispatch(setUser(userData));
      await dispatch(setUserKeypair(userKeypair))
      // await dispatch(setUserSeed(userSeed))
      await dispatch(setAccountStatus(AccountStatus.EXISITING));
      await dispatch(setUserProgram(program))
      //@ts-ignore
      await dispatch(setSolaceObj(sol))


    } else {
      console.log('INSIDE NEW USER')
      const newAccKeyPair = Keypair.generate()
      const newSk = newAccKeyPair.secretKey

      const wallet = new NodeWallet(newAccKeyPair)

      const solaceIdl = IDL as Solace;
      const connection = new Connection(clusterApiUrl("testnet"))
      const program = new Program(solaceIdl, new anchor.web3.PublicKey('8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U'), new Provider(connection, wallet, { preflightCommitment: "confirmed" }));
      const sol = new SolaceSDK({ program, owner: wallet.payer, apiProvider: new ApiProvider("") })

      // console.log("NEW SECRET KEY", newSk)
      await AsyncStorage.setItem("userKeypair", JSON.stringify(newSk))

      await dispatch(setUserProgram(program))
      await dispatch(setSolaceObj(sol))
      await dispatch(setAccountStatus(AccountStatus.NEW));
      await dispatch(setUserKeypair(newSk))
      // console.log(state.userKeypair)
      const response = await AsyncStorage.getItem('userKeypair');
      console.log("SET NEW USER KEYPAIR", response);
    }
  };

  useEffect(() => {
    console.log("get initial ")
    getInitialData();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
