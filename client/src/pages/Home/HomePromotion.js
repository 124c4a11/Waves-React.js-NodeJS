import React, { Fragment } from 'react';

import Button from '../../components/Button';


export default (props) => {
  const promotion = {
    imgUrl: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subtitle: 'in second hand guitars',
    linkTitle: 'Shop now',
    linkTo: '/shop'
  };

  const renderPromotion = () => {
    return promotion ?
    <section
      className="promotion-section"
      style={{ backgroundImage: `url(${promotion.imgUrl})`}}
    >
      <div className="container">
        <h2 className="promotion-section__title">{ promotion.title }</h2>
        <p className="promotion-section__subtitle">{ promotion.subtitle}</p>
        <Button
          type="link"
          title={ promotion.linkTitle }
          linkTo={ promotion.linkTo }
          className="promotion-section__btn"
        />
      </div>
    </section>
    : null;
  }

  return <Fragment>{ renderPromotion() }</Fragment>;
};
