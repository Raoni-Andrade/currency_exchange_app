import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <>
        <div>Login</div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="seu melhor email"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="digite aqui sua senha"
        />
      </>

    );
  }
}

export default Login;
