// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_WALLET_INFO,
  REQUEST_CURRENCIES,
  SUM_EXPENSES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_INFO:
    // console.log('ADD_WALLET_INFO action.payload ', action.payload);
    // console.log('state.expenses ', state.expenses);
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_CURRENCIES:
    console.log(action.payload);
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  case SUM_EXPENSES:
    // console.log('TESTE SUM_EXPENSES action.payload ', action.payload);
    // console.log('TESTE state.wallet.value ', state);
    return {
      ...state,
      value: action.payload,
    };
  default: return state;
  }
};

export default walletReducer;
