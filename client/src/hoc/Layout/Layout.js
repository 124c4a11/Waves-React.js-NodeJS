import React, { Component, Fragment } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Layout.scss';


export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="page-container">
          <div className="page-content">
            { this.props.children }
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
};
