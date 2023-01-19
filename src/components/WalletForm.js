import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCurrencies from '../services/currenciesAPI';
import { actionFetching,
  addWallet,
  saveEdited,
  sumExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetching());
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    } /* , () => console.log('NOME: ', name, 'VALOR: ', value, 'ALVO: ', target) */);
  };

  btnClick = async () => {
    const { dispatch } = this.props;
    const { valor,
      moeda,
      metodo,
      tag,
      description,
      id } = this.state;
    // const currencyApi = await dispatch(actionFetching());
    const chamandoAPI = await getCurrencies();
    // console.log(chamandoAPI.requestJson);
    // const getCurrenciess = await dispatch(rates());
    // console.log(currencyApi.payload);
    // console.log(getCurrenciess.payload.requestJson.exchangeRates);
    this.setState({
      id: id + 1,
    }, () => {
      const expense = {
        id,
        value: valor,
        description,
        currency: moeda,
        method: metodo,
        tag,
        exchangeRates: chamandoAPI.requestJson,
      };
      dispatch(addWallet(expense));
      dispatch(sumExpenses(Number(valor)));
    });
    this.setState({
      valor: '',
      description: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      tag: 'Alimentação',
      // exchangeRates: getCurrenciess.payload.requestJson.exchangeRates,
    });
  };

  saveEdit = () => {
    const { expenses, dispatch, idToEdit } = this.props;
    const { valor, description, moeda, metodo, tag } = this.state;

    const expensesList = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        return {
          ...expense,
          value: valor,
          currency: moeda,
          method: metodo,
          description,
          tag,
        };
      }
      return expense;
    });
    dispatch(saveEdited(expensesList));
  };

  // currencyExchange = async () =>
  // const { currency } = this.state;
  // const endpoint = `https://economia.awesomeapi.com.br/json/${currency}`

  render() {
    const { currencies, edit } = this.props;
    const { valor, moeda, metodo, tag, description } = this.state;
    // console.log(currencies);
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label htmlFor="value-input">
            Expense value:
            {' '}
            <input
              data-testid="value-input"
              id="value-input"
              name="valor"
              onChange={ this.handleInputChange }
              value={ valor }
              type="number"
            />
          </label>
          <label htmlFor="description-input">
            Expense description:
            <input
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
            />
          </label>
          Currency:
          <select
            id="currency"
            name="moeda"
            data-testid="currency-input"
            onChange={ this.handleInputChange }
            value={ moeda }
          >
            { currencies.map((curr, index) => (
              <option key={ index } value={ curr }>{ curr }</option>
            )) }
          </select>
          <label htmlFor="method">
            Payment method:
            <select
              data-testid="method-input"
              id="method"
              name="metodo"
              value={ metodo }
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Expense tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ !edit ? this.btnClick : this.saveEdit }
          >
            { !edit ? 'Adicionar despesa' : 'Editar despesa' }
          </button>
        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  ask: globalState.wallet.exchangeRates,
  edit: globalState.wallet.editor,
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
