import React from 'react';
import Carousel from 'react-slick';

import Button from '../../components/Button';


export default (props) => {
  const slides = [
    {
      imgUrl: '/images/featured/featured_home.jpg',
      title: 'Fender',
      subtitle: 'Custom Shop',
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      imgUrl: '/images/featured/featured_home_2.jpg',
      title: 'B-Stock',
      subtitle: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const generateSlides = () => {
    return  slides ?
      slides.map((slide, i) => {
        return (
          <div key={ i }>
            <div
              style={{
                minHeight: '100vh',
                backgroundImage: `url(${slide.imgUrl})`
              }}
              className="main-carousel__item"
            >
              <div className="main-carousel__item-container">
                <div className="main-carousel__item-content">
                  <div className="main-carousel__item-title">
                    { slide.title }
                  </div>
                  <div className="main-carousel__item-subtitle">
                    { slide.subtitle }
                  </div>

                  <Button
                    title={ slide.linkTitle }
                    linkTo={ slide.linkTo }
                    className="main-carousel__item-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })
    :null
  }

  return (
    <div className="main-carousel">
      <Carousel { ... settings } >
        { generateSlides() }
      </Carousel>
    </div>
  );
};
