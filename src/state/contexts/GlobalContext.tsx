import React, {createContext, Dispatch, useReducer, useState} from 'react';
import {Contact} from '../../components/wallet/ContactItem';
import globalReducer from '../reducers/global';

type InitialStateType = {
  user: boolean;
  username: string;
  contact?: Contact;
  contacts: Contact[];
};

const initialState = {
  user: true,
  username: 'rahul',
  contacts: [
    {
      id: new Date().getTime().toString() + Math.random().toString(),
      name: 'ashwin prasad',
      username: 'ashwin.solace.money',
      address: '1231jkajsdkf02198487',
    },
    {
      id: new Date().getTime().toString() + Math.random().toString(),
      name: 'sarthak sharma',
      username: 'sarthak.solace.money',
      address: 'alkjsdfoi1093890123909',
    },
  ],
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({state: initialState, dispatch: () => {}});

const GlobalProvider = ({children}: {children: any}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
