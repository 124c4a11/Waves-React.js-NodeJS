import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_SERVER } from '../../constants';

import {
  update,
  generateData,
  isFormValid
} from '../../utils/formActions';

import { Dialog } from '@material-ui/core';

import FormField from '../FormField';
import Button from '../Button';


class ChangePasswordForm extends Component {
  state = {
    resetToken: '',
    formError: false,
    formErrorMessage: '',
    formSuccess: '',
    formdata: {
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your new password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm-password',
          type: 'password',
          placeholder: 'Confirm your new password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;

    this.setState({ resetToken });
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'change-password');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'change-password');
    let formIsValid = isFormValid(this.state.formdata, 'change-password');

    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <form onSubmit={ (e) => this.onSubmit(e) }>
        <div className="form-group form-row">
          <div className="form-col">
            <FormField
              id={ 'password' }
              formdata={ this.state.formdata.password }
              change={ (element) => this.onUpdateForm(element) }
            />
          </div>
          <div className="form-col">
            <FormField
              id={ 'confirmPassword' }
              formdata={ this.state.formdata.confirmPassword }
              change={ (element) => this.onUpdateForm(element) }
            />
          </div>
        </div>

        {
          this.state.formError ?
            <div className="form-group">
              <div className="form-error-label">
                { this.state.formErrorMessage }
              </div>
            </div>
          :null
        }

        <Button
          type="submit"
          title="Change password"
        />
      </form>
    );
  };
}


export default connect(({ user }) => ({
  user
}))(withRouter(ChangePasswordForm))
