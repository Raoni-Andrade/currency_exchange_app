// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';

export const addUser = (payload) => {
  console.log('ACTION addUser chamada');
  return {
    type: ADD_USER_INFO,
    payload,
  };
};

export const addWallet = (payload) => {
  console.log('ACTION addWallet chamada');
  return {
    type: ADD_WALLET_INFO,
    payload,
  };
};