import React from 'react';

import Card from '../Card';


export default ({ products }) => {
  const renderItems = (products) => {
    return products.map((product) => (
      <li key={ product._id } className="product-list__item">
        <Card { ...product }/>
      </li>
    ));
  };

  return (
    <ul className="row product-list">
      { renderItems(products) }
    </ul>
  );
};
