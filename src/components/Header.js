/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoTrybe from '../logoTrybe.svg';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    // console.log(wallet);
    const totalSum = wallet.reduce((acc, curr) => acc
    + (curr.value * curr.exchangeRates[curr.currency].ask
    ), 0);

    return (
      <>
        <nav
          className="navbar is-warning menu"
          role="navigation"
          aria-label="main navigation"
        >
          <nav className="level">
            <p className="level-item has-text-centered ">
              <i className="navbar-item fa-solid fa-camera is-medium title is-3">
                <img
                  src={ logoTrybe }
                  alt="TrybeWallet Logo"
                  width="250.19px"
                  height="52.29px"
                  left="230.99px"
                  top="56.99px"
                />
              </i>
            </p>
          </nav>

        </nav>

        <div className="card">
          <footer className="card-footer">
            <a className="card-footer-item is-align-items-center">
              <h5 data-testid="email-field" className="is-align-items-center">
                <p className="material-symbols-outlined">
                  account_circle
                </p>
                {/* User email:
                { ' ' } */}
                { user }
              </h5>
            </a>
            <a className="card-footer-item is-align-items-center">
              <h5 data-testid="total-field" className="is-align-items-center">
                <p className="material-symbols-outlined">attach_money</p>
                { ' ' }
                { totalSum.toFixed(2) }
                { ' ' }
                <span data-testid="header-currency-field">BRL</span>

              </h5>
            </a>
          </footer>
        </div>
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
