import React from 'react';
import moment from 'moment';

export default ({ products }) => {
  const renderItems = () => {
    return products.map((product, ndx) => {
      return <tr key={ ndx }>
        <td>{ moment(product.dateOfPurchase).format('MM-DD-YYYY') }</td>
        <td>{ product.brand } { product.name }</td>
        <td>{ `$ ${product.price}` }</td>
        <td>{ product.quantity }</td>
      </tr>
    });
  };

  return (
    <div className="overflow-wrapper">
      <table className="table-striped">
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          { renderItems() }
        </tbody>
      </table>
    </div>
  )
};
