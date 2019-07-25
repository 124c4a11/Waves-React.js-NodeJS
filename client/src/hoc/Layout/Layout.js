import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getSiteData } from '../../actions/siteActions';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Layout.scss';


class Layout extends Component {
  async componentDidMount() {
    const { siteData } = this.props;

    if (!siteData) {
      await this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="page-container">
          <div className="page-content">
            { this.props.children }
          </div>
          <Footer siteData={ this.props.siteData } />
        </div>
      </Fragment>
    );
  }
};


export default connect(({ site }) => ({
  siteData: site.siteData
}))(Layout);
