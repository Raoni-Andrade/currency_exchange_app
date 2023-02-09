import getCurrencies from '../../services/currenciesAPI';

// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_EDIT = 'SAVE_EDIT';

export const addUser = (payload) => ({
  type: ADD_USER_INFO,
  payload,
});

export const addWallet = (payload) => {
  console.log();
  return {
    type: ADD_WALLET_INFO,
    payload,
  };
};

export const requestCurrencies = (payload) => {
  console.log();
  return {
    type: REQUEST_CURRENCIES,
    payload,
  };
};

export const requestCurrenciesSuccess = (payload) => {
  console.log();
  return {
    type: REQUEST_CURRENCIES_SUCCESS,
    payload,
  };
};

export const requestCurrenciesError = (payload) => ({
  type: REQUEST_CURRENCIES_ERROR,
  payload,
});

export const sumExpenses = (expenses) => ({
  type: SUM_EXPENSES,
  payload: expenses,
});

export const deleteExpenses = (expenseId) => ({
  type: DELETE_EXPENSES,
  payload: expenseId,
});

export const editExpenses = (expenseId) => ({
  type: EDIT_EXPENSES,
  payload: expenseId,
});

export const saveEdited = (expenses) => ({
  type: SAVE_EDIT,
  payload: expenses,
});

// const priceAtTheMoment = async (dispatch) => {
//   // dispatch(requestCurrencies());
//   try {
//     // requisição;
//     const fetchingApi = await getCurrencies();
//     return await dispatch(requestCurrenciesSuccess(fetchingApi));
//   } catch (error) {
//     // criar action para tratamento de erro
//     return dispatch(requestCurrenciesError(error));
//   }
// };

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
