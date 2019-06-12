import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getBrands,
  getWoods
} from '../../actions/productsActions'

import PageTopBar from '../../components/PageTopBar';


class Shop extends Component {
  async componentDidMount() {
    await this.props.dispatch(getBrands());
    await this.props.dispatch(getWoods());
  }

  render() {
    const { products } = this.props;

    return (
      <div className="flex-grow-1 d-flex flex-direction-column">
        <PageTopBar title="Browse Products" />

        <div className="flex-grow-1 d-flex">
          <div className="container d-flex">
            <div className="layout-sidebar">

            </div>
            <div className="layout-content">

            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default connect(({ products }) => ({
  products
}))(Shop);
