export const setUser = (user: any) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const changeUserName = (name: string) => {
  return {
    type: 'CHANGE_NAME',
    payload: name,
  };
};
