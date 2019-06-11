import React from 'react';

import ProductList from '../ProductList';

export default ({ title, list }) => {
  return (
    <div className="page-section">
      <div className="container">
        {
          title ?
            <h2 className="page-section__title">{ title}</h2>
          : null
        }
        {
          list.length ?
            <ProductList products={ list } />
          : null
        }
      </div>
    </div>
  );
};
