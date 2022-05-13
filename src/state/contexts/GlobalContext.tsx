import React, {createContext, Dispatch, useReducer, useState} from 'react';
import globalReducer from '../reducers/global';

type InitialStateType = {
  user: boolean;
  username: string;
};

const initialState = {
  user: true,
  username: 'rahul',
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
