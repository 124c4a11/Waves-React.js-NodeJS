import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getProductDetail,
  clearProductDetail
} from '../../actions/productsActions';

import PageTopBar from '../../components/PageTopBar';
import ProductGallery from '../../components/ProductGallery';
import ProductInfo from '../../components/ProductInfo';


export class ProductDetail extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  render() {
    const { productDetail } = this.props.products;

    return (
      <div className="flex-grow-1">
        <PageTopBar title="Product Detail" />
        <div className="container">
          <div className="product-detail">
            <div className="product-detail__gallery">
              {
                productDetail ?
                  <ProductGallery
                    detail={ productDetail }
                  />
                : null
              }
            </div>
            <div className="product-detail__info">
              {
                productDetail ?
                  <ProductInfo
                    addToCart={ (id) => this.addToCart(id) }
                    detail={ productDetail }
                  />
                : 'Loading...'
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default connect(({ products }) => ({
  products
}))(ProductDetail);
