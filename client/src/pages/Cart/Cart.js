import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCartItems } from '../../actions/userActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';

import UserLayout from '../../hoc/UserLayout';

import CartList from '../../components/CartList';


class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  async componentDidMount() {
    const { cart } = this.props.user.userData;

    let cartItems = [];

    if (cart && cart.length) {
      cartItems = cart.map(({ id }) => id);
    }

    await this.props.dispatch(getCartItems(cartItems, cart));
  };

  removeFromCart = (id) => {
    console.log(id);
  };

  render() {
    const products = this.props.user.cartDetail;

    return (
      <UserLayout>
        <h1 className="mt-0">My Cart</h1>
        {
          products && products.length ?
            <CartList
              products={ products }
              type="cart"
              removeItem={ (id) => this.removeFromCart(id) }
            />
          : null
        }
      </UserLayout>
    );
  };
};


export default connect(({ user }) => ({
  user
}))(Cart);
