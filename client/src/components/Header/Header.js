import React, { Component } from 'react';

import './Header.scss';


export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container d-flex">
          <div className="header__logo">
            <a href="/" className="logo">WAVES</a>
          </div>
          <div className="header__nav">
            <div className="header__nav-top">
              LINKS
            </div>
            <div className="header__nav-bottom">
              LINKS
            </div>
          </div>
        </div>
      </header>
    );
  }
};
