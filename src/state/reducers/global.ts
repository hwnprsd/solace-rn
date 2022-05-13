const reducer = (state: any, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: true,
      };
    case 'CHANGE_NAME':
      return {...state, username: action.payload};
    default:
      return state;
  }
};

export default reducer;
