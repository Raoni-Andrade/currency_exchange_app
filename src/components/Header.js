import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import getCurrencies from '../services/currenciesAPI';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <h5 data-testid="email-field">
          User email:
          {' '}
          { email }
          {' '}
        </h5>
        <h5 data-testid="total-field">
          Total expenses:
          {' '}
          0
          { expenses }
          {' '}
          <span data-testid="header-currency-field">
            BRL
          </span>
          {/* {getCurrencies()} */}
        </h5>
      </>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
  expenses: PropTypes.number,
}).isRequired;

const mapStateToProps = (globalState) => ({
  ...globalState.user,
  // ...globalState.wallet,
});

export default connect(mapStateToProps)(Header);
