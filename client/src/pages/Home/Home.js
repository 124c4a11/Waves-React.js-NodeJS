import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProductsBySell,
  getProductsByArrival
} from '../../actions/productsActions';

import HomeCarousel from './HomeCarousel';
import HomePromotion from './HomePromotion';


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div className="flex-grow-1">
        <HomeCarousel />
        <HomePromotion />
      </div>
    );
  }
};


export default connect(({ products }) => ({
  products
}))(Home);
