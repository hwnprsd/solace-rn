import { AccountStatus } from '../contexts/GlobalContext';

const reducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload,
      };
    case 'SET_ACCOUNT_STATUS':
      return {
        ...state,
        accountStatus: payload,
      };
    case 'SET_ONBOARDING_USER':
      return {
        ...state,
        onboardingUser: payload,
      };
    case 'CHANGE_NAME':
      return { ...state, username: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'GET_CONTACT':
      return {
        ...state,
        contact: state.contacts.find(
          (contact: any) => contact.id === action.payload,
        ),
      };
    case 'SET_PROGRAM': {
      return {
        ...state,
        program: payload
      }
    };
    case 'SET_SOLACE': {
      return {
        ...state,
        solObj: payload
      }
    };
    case 'SET_USER_KEYPAIR': {
      return {
        ...state,
        userKeypair: payload
      }
    };
    case 'SET_USER_SEED': {
      return {
        ...state,
        userSeed: payload
      }
    };
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
