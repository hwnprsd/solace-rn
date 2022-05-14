
import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { Contact } from '../../components/wallet/ContactItem';
import { setAccountStatus, setSolaceObj, setUser, setUserProgram } from '../actions/global';
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
  onboardingUser?: User;
  contact?: Contact;
  contacts?: Contact[];
};

export type User = {
  username?: string;
  keyPair: string;
  seed?: string;
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
  accountStatus: AccountStatus.NEW,
  onboardingUser: {
    keyPair: '',
  },

  contacts: [
    {
      id: new Date().getTime().toString() + Math.random().toString(),
      name: 'ashwin prasad',
      username: 'ashwin.solace.money',
      address: '1231jkajsdkf02198487',
    },
    // {
    //   id: new Date().getTime().toString() + Math.random().toString(),
    //   name: 'sarthak sharma',
    //   username: 'sarthak.solace.money',
    //   address: 'alkjsdfoi1093890123909',
    // },
  ],
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => { } });

const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);


  const getInitialData = async () => {
    // console.log(state.solObj, "SOLACE BB");
    AsyncStorage.removeItem("user")
    const response = await AsyncStorage.getItem('user');
    if (response) {
      console.log('response', response);
      const user = JSON.parse(response);

      if (state.solObj) {
        if (state.user?.keyPair !== undefined) {
          const owner = Keypair.fromSecretKey(Buffer.from(state.user?.keyPair))
          // SolaceSDK.fromSeed(user.seed)

        }

      }
      const wallet = new NodeWallet(user.keyPair)

      const solaceIdl = IDL as Solace;
      const connection = new Connection(clusterApiUrl("testnet"))
      const program = new Program(solaceIdl, new anchor.web3.PublicKey('8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U'), new Provider(connection, wallet, { preflightCommitment: "confirmed" }));
      const sol = new SolaceSDK({ program, owner: wallet.payer, apiProvider: new ApiProvider("") })

      await dispatch(setUser(user));
      await dispatch(setAccountStatus(AccountStatus.EXISITING));
      await dispatch(setUserProgram(program))
    } else {

      /// DO NOTHING
      const newAccKeyPair = Keypair.generate()
      const wallet = new NodeWallet(newAccKeyPair)
      const str = newAccKeyPair.secretKey.toString();
      const key = Buffer.from(str)
      // Keypair.fromSecretKey(key);
      const solaceIdl = IDL as Solace;
      const connection = new Connection(clusterApiUrl("testnet"))
      const program = new Program(solaceIdl, new anchor.web3.PublicKey('8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U'), new Provider(connection, wallet, { preflightCommitment: "confirmed" }));
      const sol = new SolaceSDK({ program, owner: wallet.payer, apiProvider: new ApiProvider("") })
      const userObj: User = {
        keyPair: newAccKeyPair.secretKey.toString(),


      }
      await AsyncStorage.setItem("user", JSON.stringify(userObj))

      await dispatch(setUserProgram(program))
      await dispatch(setSolaceObj(sol))
      await dispatch(setAccountStatus(AccountStatus.NEW));

      const response = await AsyncStorage.getItem('user');
      console.log("SET NEW USER LETS GO", response);
      // const seed = "LMAO"

    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
