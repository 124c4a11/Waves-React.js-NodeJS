import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addToCart } from '../../actions/userActions';

import Button from '../Button';


class Card extends Component {
  getClassName = () => {
    return this.props.isInline ? 'card card_inline' : 'card';
  }

  renderCardImg(imgs) {
    return imgs.length ? imgs[0].url : '/images/image_not_availble.png';
  }

  render() {
    const props = this.props;

    return (
      <div className={ this.getClassName() }>
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
          {
            this.props.isInline ?
              <div className="card__description">
                { props.description }
              </div>
            : null
          }
          <div className="card__actions">
            <div className="card__actions-col">
              <Button
                type="link"
                title="View product"
                linkTo={`/product/${props._id}`}
                className="card__btn"
              />
            </div>
            <div className="card__actions-col">
              <Button
                type="bag-link"
                runAction={ () => {
                  props.user.userData.isAuth ?
                    this.props.dispatch(addToCart(props._id))
                  :
                    this.props.history.push('/login')
                } }
                className="card__btn"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
};


export default connect(({ user }) => ({
  user
}))(withRouter(Card));
