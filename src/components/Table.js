import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  deleteExpense = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(expenseId));
  };

  editExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead className="thead">
            <tr>
              <th>Description</th>
              <th>Tag</th>
              <th>Payment method</th>
              <th>Value</th>
              <th>Currency</th>
              <th>Exchange rate</th>
              <th>Value converted</th>
              <th>Converting to</th>
              <th>Edit/Delete</th>
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
                    data-testid="edit-btn"
                    type="button"
                    className="material-symbols-outlined is-hoverable"
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    Edit
                  </button>
                  <button
                    data-testid="delete-btn"
                    className="material-symbols-outlined is-hoverable"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Delete
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
  dispatch: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
