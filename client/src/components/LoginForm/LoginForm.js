import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/userActions';

import {
  update,
  generateData,
  isFormValid
} from '../../utils/formActions';

import FormField from '../FormField';
import Button from '../Button';


class LoginForm extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'login');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      await this.props.dispatch(loginUser(dataToSubmit));

      if (this.props.user.loginSuccess) {
        this.props.history.push('/user/dashboard');
      } else {
        this.setState({ formError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <form onSubmit={ (e) => this.onSubmit(e) }>
        <div className="form-group">
          <FormField
            id={ 'email' }
            formdata={ this.state.formdata.email }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

        <div className="form-group">
          <FormField
            id={ 'password' }
            formdata={ this.state.formdata.password }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

        { this.state.formError ?
          <div className="form-group">
            <div className="form-error-label">
              Please check your data
            </div>
          </div>
        :null }

        <Button
          type="submit"
          title="Log in"
          className="mr-1 mb-1"
        />

        <Button
          type="link"
          linkTo="/reset_password"
          title="Forgot my password"
        />
      </form>
    );
  };
}


export default connect(({ user }) => ({
  user
}))(withRouter(LoginForm));
