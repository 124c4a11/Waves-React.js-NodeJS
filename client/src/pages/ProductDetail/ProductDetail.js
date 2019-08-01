import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getProductDetail,
  clearProductDetail
} from '../../actions/productsActions';

import { addToCart } from '../../actions/userActions';

import PageTopBar from '../../components/PageTopBar';
import ProductGallery from '../../components/ProductGallery';
import ProductInfo from '../../components/ProductInfo';


class ProductDetail extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.dispatch(getProductDetail(id));

    if (!this.props.products.productDetail) {
      this.props.history.push('/');
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  };

  addToCart = (id) => {
    if (!this.props.user.userData.isAuth) {
      this.props.history.push('/login');
    } else {
      this.props.dispatch(addToCart(id));
    }
  };

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
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default connect(({ products, user }) => ({
  products,
  user
}))(withRouter(ProductDetail));
