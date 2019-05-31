import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from '../../actions/userActions';

import { CircularProgress } from '@material-ui/core';


export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationsChech extends Component {
    state = {
      loading: true
    };

    async componentDidMount() {
      await this.props.dispatch(auth());

      const user = this.props.user;

      this.setState({ loading: false });

      if (!user.isAuth) {
        if (reload) {
          this.props.history.push('/login');
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          this.props.history.push('/user/dashboard');
        } else {
          if (reload === false) {
            this.props.history.push('/user/dashboard');
          }
        }
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="preloader">
            <CircularProgress
              thickness={ 3 }
              style={{ color: '#999592' }}
            />
          </div>
        );
      }

      return (
        <ComposedClass
          { ...this.props }
          user={ this.props.user }
        />
      );
    };
  }

  return connect(({ user }) => ({
    user: user.userData
  }))(AuthenticationsChech);
}
