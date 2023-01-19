import Proptypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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

              <tr className="table-primary" key={ expense.idToEdit }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.currency }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                {/* <td>{ expense.exchangeRates[expense.currency].name }</td> */}
                {/* <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td> */}
                {/* <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td> */}
                {/* <td>{ expenses[0].ask }</td> */}
                {/* <td>
                <button type="button" className="btn btn-secondary">Editar</button>
                <buttonexchangeRates
                  Excluir
                </button>
              </td> */}
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
  // dispatch: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
