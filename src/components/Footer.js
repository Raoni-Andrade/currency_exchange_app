import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>TrybeWallet</strong>
              {' '}
              developed by
              {' '}
              <a href="https://www.linkedin.com/in/raoni-andrade-dev/">Raoni Andrade</a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
