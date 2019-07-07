import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCartItems } from '../../actions/userActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';

import UserLayout from '../../hoc/UserLayout';


class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  async componentDidMount() {
    const { cart } = this.props.user;

    let cartItem = [];

    if (cart && cart.length) {
      cartItem = cart.map(({ id }) => id);
    }

    await this.props.dispatch(getCartItems(cartItem, cart));
  };

  render() {
    return (
      <UserLayout>
        <div>
          Cart
        </div>
      </UserLayout>
    );
  };
};


export default connect(({ user }) => ({

}))(Cart);
