import React from 'react';

import Card from '../Card';


export default ({ products, isList = false }) => {
  if (!products || !products.length) return null;

  const classname = isList ? 'product-list product-list_list' : 'product-list';

  const renderItems = (products) => {
    return products.map((product) => (
      <li key={ product._id } className="product-list__item">
        <Card  { ...product } isInline={ isList }/>
      </li>
    ));
  };

  return (
    <ul className={ classname }>
      { renderItems(products) }
    </ul>
  );
};
