import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
        linkTo: '/logout',
        public: false
      }
    ]
  };

  calculateProductsQuantity = () => {
    const { cart } = this.props.user.userData;

    let quantity = 0;

    cart.forEach((item) => quantity += item.quantity);

    return quantity;
  };

  generateMenuItems = (links) => {
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
                  { this.calculateProductsQuantity() }
                </span>
                { link.name }
              </Link>
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

  render() {
    return (
      <header className="header">
        <div className="container header__row">
          <div className="header__logo">
            <Link to="/" className="logo">WAVES</Link>
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
  };
};


export default connect(({ user }) => ({
  user
}))(Header);
