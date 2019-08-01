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

import FormField from '../FormField';
import Button from '../Button';


class ResetPasswordForm extends Component {
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
      }
    }
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'reset-password');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'reset-password');
    let formIsValid = isFormValid(this.state.formdata, 'reset-password');

    if (formIsValid) {
      const res = await axios.patch(`${USER_SERVER}/reset_password`, dataToSubmit);

      const { success } = res.data;

      if (success) {
        this.setState({ formSuccess: true })
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

        {
          this.state.formSuccess ?
            <div className="form-group">
              <div className="form-success-label">
                Done, check your email!
              </div>
            </div>
          : null
        }

        {
          this.state.formError ?
            <div className="form-group">
              <div className="form-error-label">
                Please check your data
              </div>
            </div>
          :null
        }

        <Button
          type="submit"
          title="Send email to reset password"
        />
      </form>
    );
  };
}


export default connect(({ user }) => ({
  user
}))(withRouter(ResetPasswordForm));
