const reducer = (state: any, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: true,
      };
    case 'CHANGE_NAME':
      return {...state, username: action.payload};
    case 'ADD_CONTACT':
      return {...state, contacts: [...state.contacts, action.payload]};
    case 'GET_CONTACT':
      return {
        ...state,
        contact: state.contacts.find(
          (contact: any) => contact.id === action.payload,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
