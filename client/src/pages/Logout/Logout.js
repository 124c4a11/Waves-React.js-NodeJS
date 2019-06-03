import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/userActions'


class Logout extends Component {
  async componentDidMount() {
    await this.props.dispatch(logout());

    if (this.props.user.success) {
      this.props.history.push('/');
    }
  };

  render() {
    return ( <div></div> );
  };
};


export default connect(({ user }) => ({
  user
}))(withRouter(Logout));

