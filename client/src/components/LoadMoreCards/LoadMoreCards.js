import React, { Fragment } from 'react';

import ProductList from '../ProductList';


export default ({ products }) => {
  return (
    <Fragment>
      <ProductList products={ products } />
    </Fragment>
  );
};
