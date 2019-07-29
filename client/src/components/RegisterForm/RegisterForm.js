import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Dialog } from '@material-ui/core';

import { registerUser } from '../../actions/userActions';

import {
  update,
  generateData,
  isFormValid
} from '../../utils/formActions';

import FormField from '../FormField';
import Button from '../Button';


class RegisterForm extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname',
          type: 'text',
          placeholder: 'Enter your lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

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

      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm-password',
          type: 'password',
          placeholder: 'Confirm your password'
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
  }

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'register');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');

    if (formIsValid) {
      await this.props.dispatch(registerUser(dataToSubmit));

      if (this.props.user.isRegister) {
        this.setState({
          formError: false,
          formSuccess: true
        });

        setTimeout(() => {
          this.props.history.push('/login');

        }, 3000);
      } else {
        this.setState({ formError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={ (e) => this.onSubmit(e) }>
          <h2 className="modal__title mt-0">Personal information</h2>

          <div className="form-group form-row">
            <div className="form-col">
              <FormField
                id={ 'name' }
                formdata={ this.state.formdata.name }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-col">
              <FormField
                id={ 'lastname' }
                formdata={ this.state.formdata.lastname }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
          </div>

          <div className="form-group">
            <FormField
              id={ 'email' }
              formdata={ this.state.formdata.email }
              change={ (element) => this.onUpdateForm(element) }
            />
          </div>

          <h2 className="modal__title mt-0">Verify password</h2>

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

          { this.state.formError ?
            <div className="form-group">
              <div className="form-error-label">
                Please check your data
              </div>
            </div>
          :null }

          <Button
            type="submit"
            title="Create an account"
          />
        </form>

        <Dialog open={ this.state.formSuccess }>
          <div className="dialog-alert">
            <div className="dialog-alert__title">Congratulations!!!</div>
            <p>You will be redirected to LOGIN in a couple seconds...</p>
          </div>
        </Dialog>
      </Fragment>
    );
  };
}


export default connect(({ user }) => ({
  user
}))(withRouter(RegisterForm));
