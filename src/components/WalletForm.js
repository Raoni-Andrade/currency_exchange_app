/* eslint-disable react/jsx-max-depth */
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
      metodo: 'Cash',
      tag: 'Food',
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
    });
  };

  btnClick = async () => {
    const { dispatch } = this.props;
    const { valor,
      moeda,
      metodo,
      tag,
      description,
      id } = this.state;
    const chamandoAPI = await getCurrencies();
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
      metodo: 'Cash',
      tag: 'Food',
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

  render() {
    const { currencies, editor } = this.props;
    const { valor, moeda, metodo, tag, description } = this.state;
    return (
      <form className="formWallet box is-flex">
        <fieldset className="field has-addons is-flex">
          <div className="control">
            <label htmlFor="value-input label">
              Value:
              {' '}
              <div className="control">
                <input
                  className="input is-link is-rounded"
                  data-testid="value-input"
                  id="value-input"
                  name="valor"
                  onChange={ this.handleInputChange }
                  value={ valor }
                  type="text"
                />
              </div>
            </label>
          </div>
          <div className="field mr-5">
            <label className="label" htmlFor="currency">
              Currency:
              <div className="control">
                <div className="select">
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
                </div>
              </div>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="dropdown is-hoverable mr-5">
            <div className="trigger">
              <label htmlFor="description-input">
                Description:
                <div className="control">
                  <input
                    className="input is-info"
                    data-testid="description-input"
                    id="description-input"
                    name="description"
                    value={ description }
                    onChange={ this.handleInputChange }
                  />
                </div>
              </label>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <p>
                    A brief description about
                    {' '}
                    the expense
                    {' '}
                    <strong>so you won&apos;t forget later</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div
            className="field is-grouped is-grouped-multiline
        is-flex-direction-row is-align-items-center"
          >

            <div className="field mr-5">
              <label className="label" htmlFor="method">
                Payment method:
                <div className="control">
                  <div className="select">
                    <select
                      data-testid="method-input"
                      id="method"
                      name="metodo"
                      value={ metodo }
                      onChange={ this.handleInputChange }
                    >
                      <option value="Cash">Cash</option>
                      <option value="Credid card">Credid card</option>
                      <option value="Debit card">Debit card</option>
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <div className="field mr-5">
              <label className="label" htmlFor="tag">
                Tag:
                <div className="control">
                  <div className="select">
                    <select
                      data-testid="tag-input"
                      id="tag"
                      name="tag"
                      value={ tag }
                      onChange={ this.handleInputChange }
                    >
                      <option value="Food">Food</option>
                      <option value="Leisure">Leisure</option>
                      <option value="Work">Work</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <div className="">
              <button
                type="button"
                className={ !editor ? 'button is-success is-hoverable'
                  : 'button is-warning is-hoverable' }
                onClick={ !editor ? this.btnClick : this.saveEdit }
              >
                { !editor ? 'Add expense' : 'Edit expense' }
              </button>
            </div>
          </div>
        </fieldset>
      </form>
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
  editor: globalState.wallet.editor,
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
