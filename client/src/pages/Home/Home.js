import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProductsBySell,
  getProductsByArrival
} from '../../actions/productsActions';

import CardSection from '../../components/CardSection';

import HomeCarousel from './HomeCarousel';
import HomePromotion from './HomePromotion';


class Home extends Component {
  async componentDidMount() {
    await this.props.dispatch(getProductsBySell());
    await this.props.dispatch(getProductsByArrival());
  }

  render() {
    const { products } = this.props;

    return (
      <div className="flex-grow-1">
        <HomeCarousel />
        {
          products.bySell ?
            <CardSection
              title={ 'Best Selling guitars'}
              list={ products.bySell }
            />
          : null
        }
        <HomePromotion />
        {
          products.byArrival ?
            <CardSection
              title={ 'New arrivals' }
              list={ products.byArrival }
            />
          : null
        }
      </div>
    );
  }
};


export default connect(({ products }) => ({
  products
}))(Home);
