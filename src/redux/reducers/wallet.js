// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_WALLET_INFO, REQUEST_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_INFO:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload],
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  default: return state;
  }
};

export default walletReducer;
