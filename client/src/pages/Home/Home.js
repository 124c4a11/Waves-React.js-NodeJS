import React, { Component } from 'react';

import HomeCarousel from './HomeCarousel';
import HomePromotion from './HomePromotion';


export default class Home extends Component {
  render() {
    return (
      <div className="flex-grow-1">
        <HomeCarousel />
        <HomePromotion />
      </div>
    );
  }
};
