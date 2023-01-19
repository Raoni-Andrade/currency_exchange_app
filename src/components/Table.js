import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  deleteExpense = (expenseId) => {
    const { dispatch } = this.props;
    // console.log(expenseId);
    dispatch(deleteExpenses(expenseId));
  };

  render() {
    const { expenses } = this.props;
    // console.log('EXPENSES ARRAY: ', expenses);
    return (
      <div>
        <span>
          WALLET TABLE
        </span>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.length > 0 && expenses.map((expense) => (

              <tr className="table-primary" key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ (+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                <td>
                  { Number(+expense.value
                  * expense.exchangeRates[expense.currency].ask).toFixed(2)}

                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: Proptypes.arrayOf(Proptypes.objectOf).isRequired,
  // exchangeRates:
  dispatch: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
