import React, { Component } from 'react';

import Button from '../Button';


class Card extends Component {
  renderCardImg(imgs) {
    return imgs.length ? imgs[0].url : '/images/image_not_availble.png';
  }

  render() {
    const props = this.props;

    return (
      <div className='card'>
        <div
          style={{
            backgroundImage: `url(${this.renderCardImg(props.images)})`
          }}
          className="card__img"
        ></div>

        <div className="card__body">
          <div className="card__header">
            <div className="card__brand">{ props.brand.name }</div>
            <h3 className="card__name">{ props.name }</h3>
            <div className="card__price">${ props.price }</div>
          </div>
          <div className="card__actions">
            <div className="card__actions-col">
              <Button
                type="link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                className="card__btn"
              />
            </div>
            <div className="card__actions-col">
              <Button
                type="bag-link"
                runAction={ () => console.log('added to cart') }
                className="card__btn"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default Card;
