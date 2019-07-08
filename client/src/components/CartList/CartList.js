import React from 'react';

import Button from '../Button';


export default ({ products, removeItem }) => {
  const renderImage = (images) => (
    images.length ? images[0].url : '/images/image_not_availble.png'
  );

  const renderItems = () => (
    products.map((product) => (
      <li key={ product._id } className="list-table__item">
        <div className="list-table__item-img-wrap">
          <div
            style={{ backgroundImage: `url(${renderImage(product.images)})`}}
            className="list-table__item-img"
          ></div>
        </div>
        <div className="list-table__item-text-wrap">
          <h3 className="list-table__item-title">Product Name</h3>
          <p>
            { product.brand.name } { product.name }
          </p>
        </div>
        <div className="list-table__item-text-wrap">
          <h3 className="list-table__item-title">Quantity</h3>
          <p>{ product.quantity }</p>
        </div>
        <div className="list-table__item-text-wrap">
          <h3 className="list-table__item-title">Price</h3>
          <p>{ `$ ${product.price}` }</p>
        </div>
        <div className="list-table__item-actions">
          <div>
            <Button
              title="Remove"
              className="btn_danger btn_sm"
              runAction={ () => removeItem(product._id) }
            />
          </div>
        </div>
      </li>
    ))
  );

  return (
    <ul className="list-table">
      { renderItems() }
    </ul>
  );
};
