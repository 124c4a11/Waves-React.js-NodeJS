import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  update,
  generateData,
  isFormValid
} from '../../utils/formActions';

import FormField from '../FormField';


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

  onSubmit = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      console.log(dataToSubmit);
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

        <button
          onClick={ (e) => this.onSubmit(e) }
          className="btn"
        >Log in</button>
      </form>
    )
  };
}


export default connect()(LoginForm);
