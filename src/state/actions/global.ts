import { Contact } from '../../components/wallet/ContactItem';
import { AccountStatus } from '../contexts/GlobalContext';
import * as anchor from "../../@project-serum/anchor"
import { Solace } from '../../solace-sdk/solace/types';
import { SolaceSDK } from '../../solace-sdk/sdk';

export const setUser = (user: any) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const setIsLoading = (isLoading: boolean) => {
  return {
    type: "SET_LOADING",
    payload: isLoading
  }
}

export const setAccountStatus = (status: AccountStatus) => {
  return {
    type: 'SET_ACCOUNT_STATUS',
    payload: status,
  };
};

export const setUserProgram = (program: anchor.Program<Solace>) => {
  return {
    type: 'SET_PROGRAM',
    payload: program
  }
}

export const setSolaceObj = (sol: SolaceSDK) => {
  return {
    type: 'SET_SOLACE',
    payload: sol
  }
}

export const setUserKeypair = (keypair: any) => {
  return {
    type: 'SET_USER_KEYPAIR',
    payload: keypair
  }
}

export const setUserSeed = (seed: string) => {
  return {
    type: 'SET_USER_SEED',
    payload: seed
  }
}

export const setOnboardingUser = (user: any) => {
  return {
    type: 'SET_ONBOARDING_USER',
    payload: user,
  };
};

export const changeUserName = (name: string) => {
  return {
    type: 'CHANGE_NAME',
    payload: name,
  };
};

export const addNewContact = (contact: Contact) => {
  return {
    type: 'ADD_CONTACT',
    payload: contact,
  };
};

export const getContact = (id: string) => {
  return {
    type: 'GET_CONTACT',
    payload: id,
  };
};
