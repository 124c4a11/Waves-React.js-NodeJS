import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/userActions';

import './Header.scss';


class Header extends Component {
  state = {
    pages: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],

    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      }
    ]
  };

  generateMenuItems = (links) => {
    const user = this.props.user.userData;

    return links.map((link) => {
      switch (link.name) {
        case 'My Cart':
          return (
            <li
              className="header__nav-list-item"
              key={ link.name }
            >
              <Link
                className="header__nav-list-link"
                to={ link.linkTo }
              >
                <span className="header__nav-list-badge">
                  { user.cart ? user.cart.length : 0 }
                </span>
                { link.name }
              </Link>
            </li>
          );

        case 'Log out':
          return (
            <li
              className="header__nav-list-item"
              key={ link.name }
            >
              <button
                onClick={ this.onLogout }
                className="header__nav-list-link"
              >{ link.name }</button>
            </li>
          );

        default:
          return (
            <li
              className="header__nav-list-item"
              key={ link.name }
            >
              <Link
                className="header__nav-list-link"
                to={ link.linkTo }
              >{ link.name }</Link>
            </li>
          );
      }
    });
  };

  generateMenuList = (links) => {
    const user = this.props.user.userData;

    let listLinks = [];

    if (user) {
      links.forEach((link) => {
        if (!user.isAuth) {
          if (link.public) listLinks.push(link);
        } else {
          if (link.name !== 'Log in') listLinks.push(link);
        }
      });
    }

    return (
      <ul className="header__nav-list">
        { this.generateMenuItems(listLinks) }
      </ul>
    );
  };

  onLogout = async () => {
    await this.props.dispatch(logout());

    if (this.props.user.success) {
      this.props.history.push('/');
    }
  };

  loger = () => console.log('Click');

  render() {
    return (
      <header className="header">
        <div className="container d-flex">
          <div className="header__logo">
            <a href="/" className="logo">WAVES</a>
          </div>
          <nav className="header__nav">
            <div className="header__nav-top">
              { this.generateMenuList(this.state.user) }
            </div>
            <div className="header__nav-bottom">
              { this.generateMenuList(this.state.pages) }
            </div>
          </nav>
        </div>
      </header>
    );
  }
};


export default connect(({ user }) => ({
  user
}))(withRouter(Header));
