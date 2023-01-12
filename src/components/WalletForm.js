import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetching } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetching());
  }

  render() {
    const { currencies } = this.props;
    // const
    return (
      <>
        <div>WalletForm</div>
        <form>
          Expense value:
          {' '}
          <input data-testid="value-input" />
          Expense description:
          <input data-testid="description-input" />
          Currency:
          <select
            id="currency"
            name="moeda"
            data-testid="currency-input"
            // value={ moeda }
          >
            { currencies.map((curr, index) => (
              <option key={ index } value={ curr }>{ curr }</option>
            )) }
          </select>
          Payment method:
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          Expense tag:
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            // onClick={ this.btnClick }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
