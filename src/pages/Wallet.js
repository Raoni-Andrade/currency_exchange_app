import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>Wallet</div>
    );
  }
}

export default connect()(Wallet);
