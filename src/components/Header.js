import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import getCurrencies from '../services/currenciesAPI';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    console.log(wallet);
    const totalSum = wallet.reduce((acc, curr) => acc
    + (curr.value * curr.exchangeRates[curr.currency].ask
    ), 0);
    console.log(totalSum);

    return (
      <>
        <h5 data-testid="email-field">
          User email:
          {' '}
          { user }
          {' '}
        </h5>
        <h5 data-testid="total-field">
          {/* Total expenses: */}
          { totalSum.toFixed(2) }
        </h5>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
  expenses: PropTypes.number,
}).isRequired;

const mapStateToProps = (globalState) => ({
  user: globalState.user.email,
  wallet: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
