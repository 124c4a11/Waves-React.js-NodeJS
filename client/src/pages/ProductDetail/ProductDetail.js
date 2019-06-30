import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProductDetail,
  clearProductDetail
} from '../../actions/productsActions';

import PageTopBar from '../../components/PageTopBar';


export class ProductDetail extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  render() {
    return (
      <div className="flex-grow-1">
        <PageTopBar title="Product Detail" />
        <div className="container">
          {
            this.props.products.productDetail ?
              <div>ProductDetail</div>
            : 'Loading...'
          }
        </div>
      </div>
    );
  };
};


export default connect(({ products }) => ({
  products
}))(ProductDetail);
