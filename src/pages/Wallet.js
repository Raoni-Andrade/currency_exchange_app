import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
        <Footer />
      </>
    );
  }
}

export default connect()(Wallet);
