import React, { Component } from 'react';
import { connect } from 'react-redux';

import { frets } from '../../utils/fixedCategories';

import {
  getBrands,
  getWoods
} from '../../actions/productsActions'

import PageTopBar from '../../components/PageTopBar';
import CollapseCheckbox from '../../components/CollapseCheckbox';


class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };

  async componentDidMount() {
    await this.props.dispatch(getBrands());
    await this.props.dispatch(getWoods());
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };

    newFilters[category] = filters;

    this.setState({ filters: newFilters });
  };

  render() {
    const { products } = this.props;

    return (
      <div className="flex-grow-1 d-flex flex-direction-column">
        <PageTopBar title="Browse Products" />

        <div className="flex-grow-1 d-flex">
          <div className="container d-flex">
            <div className="layout-sidebar py-0">
              <CollapseCheckbox
                title="Brands"
                list={ products.brands }
                handleFilters={ (filters) => this.handleFilters(filters, 'brand') }
                initState={ true }
              />
              <CollapseCheckbox
                title="Frets"
                list={ frets }
                handleFilters={ (filters) => this.handleFilters(filters, 'frets') }
                initState={ false }
              />
              <CollapseCheckbox
                title="Woods"
                list={ products.woods }
                handleFilters={ (filters) => this.handleFilters(filters, 'wood') }
                initState={ false }
              />
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
