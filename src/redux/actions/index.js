import getCurrencies from '../../services/currenciesAPI';

// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

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

export const requestCurrencies = (payload) => {
  console.log('ACTION requestCurrencies chamada');
  return {
    type: REQUEST_CURRENCIES,
    payload,
  };
};

const currencyValue = async (dispatch) => {
  try {
    const value = await getCurrencies();
    console.log(value);
    const filteredCurrencies = value.currenciesList.filter((curr) => curr !== 'USDT');
    console.log(filteredCurrencies);
    await dispatch(requestCurrencies(filteredCurrencies));
  } catch (error) {
    console.log(error);
  }
};

export const actionFetching = () => currencyValue;
