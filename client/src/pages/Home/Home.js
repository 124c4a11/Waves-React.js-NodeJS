import React, { Component } from 'react';

import HomeCarousel from './HomeCarousel';


export default class Home extends Component {
  render() {
    return (
      <div className="flex-grow-1">
        <HomeCarousel />
      </div>
    );
  }
};
