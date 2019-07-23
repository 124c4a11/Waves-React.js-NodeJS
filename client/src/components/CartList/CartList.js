import React from 'react';

import Button from '../Button';


export default ({ products, removeItem }) => {
  const renderImage = (images) => (
    images.length ? images[0].url : '/images/image_not_availble.png'
  );

  const renderItems = () => (
    products.map((product) => (
      <tr key={ product._id }>
        <td className="product-table__item-img-wrap">
          <div
            style={{ backgroundImage: `url(${renderImage(product.images)})`}}
            className="product-table__item-img"
          ></div>
        </td>
        <td className="text-center">
          <h3 className="list-table__item-title">Product Name</h3>
          { product.brand.name } { product.name }
        </td>
        <td className="text-center">
          <h3 className="list-table__item-title">Quantity</h3>
          { product.quantity }
        </td>
        <td className="text-center">
          <h3 className="list-table__item-title">Price</h3>
          { `$ ${product.price}` }
        </td>
        <td className="text-right">
          <Button
            title="Remove"
            className="btn_danger btn_sm"
            runAction={ () => removeItem(product._id) }
          />
        </td>
      </tr>
    ))
  );

  return (
    <div className="overflow-wrapper">
      <table className="product-table">
        <tbody>
          { renderItems() }
        </tbody>
      </table>
    </div>
  );
};
