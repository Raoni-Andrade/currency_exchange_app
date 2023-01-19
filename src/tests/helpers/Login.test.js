import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Login from '../../pages/Login';

describe('Testes referentes a página de login', () => {
  it('A pagína deve conter um input de email, senha e botão "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { name: /Login/i, level: 1 });
    const inputEmail = screen.getByPlaceholderText(/seu melhor email/i);
    const inputPassword = screen.getByPlaceholderText(/digite aqui sua senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();

    // userEvent.type(inputEmail, 'tryber@g.com');
  });
  it('É possível digitar nos inputs e ser redirecionado para /carteira ao clicar no botão "Entrar"', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/seu melhor email/i);
    const inputPassword = screen.getByPlaceholderText(/digite aqui sua senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'tryber@g.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(enterButton);

    const valueInput = screen.getByText(/expense value:/i);

    expect(valueInput).toBeInTheDocument();
  });
  it('Testa se o botão "Entrar" está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const title = screen.getByRole('heading', { name: /Login/i, level: 1 });
    const inputEmail = screen.getByPlaceholderText(/seu melhor email/i);
    const inputPassword = screen.getByPlaceholderText(/digite aqui sua senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(enterButton).toBeDisabled();
  });
});
