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
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(target);
    this.setState({
      [name]: value,
    }, () => {
      this.isEmailValid();
    });
  };

  isEmailValid = () => {
    const { email, password } = this.state;
    const regex = /[a-z0-9]+@[a-z0-9]+\.com/;
    const minPassword = 5;
    // console.log(regex.test(email));
    if (regex.test(email) && password.length > minPassword) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
    // this.setState({
    //   isBtnEnabled: regex.test(email),
    // });
    // return regex.test(email);
  };

  // isFormValid = () => {
  //   console.log(isEmailValid());
  //   if (this.isEmailValid()) {
  //     this.setState({
  //       isBtnDisabled: false,
  //     });
  //   } else {
  //     this.setState({
  //       isBtnDisabled: true,
  //     });
  //   }
  // };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <>
        <div>Login</div>
        <div>
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="seu melhor email"
          />
        </div>
        <div>
          Senha
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="digite aqui sua senha"
          />
        </div>
        <button
          type="button"
          // onClick={ this.handleClick }
          disabled={ isBtnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </>

    );
  }
}

Login.propTypes = ({
  history: PropTypes.shape(),
  dispatch: PropTypes.func,
}).isRequired;

export default connect()(Login);
