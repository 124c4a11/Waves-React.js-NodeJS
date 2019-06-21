import React, { Fragment } from 'react';

import Button from '../Button';
import ProductList from '../ProductList';


export default ({ products, loadMore, size, limit, grid }) => {
  return (
    <Fragment>
      <ProductList products={ products } isList={ !grid } />
      {
        size && size >= limit ?
          <div className="load-more-bar">
            <Button
              title="load more"
              runAction={ () => loadMore() }
              className="btn_blue btn_cta"
            />
          </div>
        : null
      }
    </Fragment>
  );
};
