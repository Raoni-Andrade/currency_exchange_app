/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '', // string que armazena o email da pessoa usuária
      password: '',
      isBtnDisabled: true,
      emailError: 'Please, type a valid email',
      passwordError: 'Your password must have at least 6 characters',
      regex: /[a-z0-9]+@[a-z0-9]+\.com/,
      minPassword: 5,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.isEmailValid();
    });
  };

  isEmailValid = () => {
    const { email, password, regex, minPassword } = this.state;
    // const regex = /[a-z0-9]+@[a-z0-9]+\.com/;
    // const minPassword = 5;
    if (regex.test(email) && password.length > minPassword) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/wallet');
  };

  render() {
    const { email,
      password,
      isBtnDisabled, regex, emailError, passwordError } = this.state;
    return (
      <div className="formLogin container is-max-widescreen">
        <form className="container box">
          <figure>
            <img src="https://user-images.githubusercontent.com/108159316/209893591-f366bb1d-42a6-4a90-b503-78d91cd66c9a.png" alt="LOGO TRYBE" />
          </figure>
          <div className="field">
            <label className="label">
              Email
            </label>
            <div className="control">
              <input
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
                className="input material-symbols-outlined"
                data-testid="email-input"
                placeholder="Email"
              />
              { regex.test(email) || <small>{ emailError }</small> }
            </div>
          </div>
          <div className="field">
            <label className="label">
              Password
            </label>
            <div className="control">
              <input
                type="password"
                name="password"
                id="password"
                value={ password }
                onChange={ this.handleChange }
                data-testid="password-input"
                className="input material-symbols-outlined"
                placeholder="lock"
              />
              { isBtnDisabled && <small>{ passwordError }</small> }
            </div>
          </div>

          <button
            className="button is-primary"
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}).isRequired;

export default connect()(Login);
