import getCurrencies from '../../services/currenciesAPI';

// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';

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

export const requestCurrenciesSuccess = (payload) => {
  console.log('ACTION requestCurrenciesSuccess chamada');
  return {
    type: REQUEST_CURRENCIES_SUCCESS,
    payload,
  };
};

export const requestCurrenciesError = (payload) => {
  console.log('ACTION requestCurrenciesError chamada');
  return {
    type: REQUEST_CURRENCIES_ERROR,
    payload,
  };
};

export const sumExpenses = (expenses) => ({
  type: SUM_EXPENSES,
  payload: expenses,
});

const priceAtTheMoment = async (dispatch) => {
  // dispatch(requestCurrencies());
  try {
    // requisição;
    const fetchingApi = await getCurrencies();
    return await dispatch(requestCurrenciesSuccess(fetchingApi));
  } catch (error) {
    // criar action para tratamento de erro
    return dispatch(requestCurrenciesError(error));
  }
};

const currencyValue = async (dispatch) => {
  try {
    const value = await getCurrencies();
    // console.log(value);
    const filteredCurrencies = value.currenciesList.filter((curr) => curr !== 'USDT');
    // console.log(filteredCurrencies);
    await dispatch(requestCurrencies(filteredCurrencies));
  } catch (error) {
    return dispatch(requestCurrenciesError(error));
  }
};

export const actionFetching = () => currencyValue;
export const rates = () => priceAtTheMoment;
