import React, {createContext, Dispatch, useReducer, useState} from 'react';
import globalReducer from '../reducers/global';

type InitialStateType = {
  user: boolean;
  username: string;
  contacts: {name: string; username: string; address: string}[];
};

const initialState = {
  user: true,
  username: 'rahul',
  contacts: [
    {
      name: 'ashwin prasad',
      username: 'ashwin.solace.money',
      address: '1231jkajsdkf02198487',
    },
    {
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
