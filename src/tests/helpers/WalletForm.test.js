import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import App from '../../App';
import mockData from './mockData';

describe('Testes referentes a página Wallet e WalletForm', () => {
  it('Verifica elementos da página /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const expenseValue = screen.getByTestId('value-input');
    const expenseTag = screen.getByTestId('tag-input');
    const paymentMethod = screen.getByTestId('method-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(expenseValue).toBeInTheDocument();
    expect(expenseTag).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();
    expect(paymentMethod).toBeInTheDocument();
  });
  it('Testa se os elementos presentes no Wallet são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputEmail = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');

    expect(inputEmail).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
  it('Verifica se é feito fetch', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
  });
  it('Verifica se é adicionada a despesa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const expenseValue = screen.getByTestId('value-input');
    const expenseTag = screen.getByTestId('tag-input');
    const paymentMethod = screen.getByTestId('method-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    const expenseDescription = screen.getByRole('textbox', { name: /expense description/i });
    const expenseCurrency = await screen.findByTestId('currency-input', { name: 'EUR' });
    userEvent.type(expenseValue, '1');
    userEvent.type(expenseDescription, 'Ônibus');
    userEvent.selectOptions(paymentMethod, ['Dinheiro']);
    userEvent.selectOptions(expenseTag, ['Transporte']);

    expect(expenseCurrency).toBeInTheDocument();

    userEvent.click(addExpenseBtn);

    expect(global.fetch).toHaveBeenCalled();

    const description = await screen.findByRole('cell', { name: /ônibus/i });
    const tag = await screen.findByRole('cell', { name: /transporte/i });
    const method = await screen.findByRole('cell', { name: /dinheiro/i });
    const value = await screen.findByRole('cell', { name: /1\.00/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
