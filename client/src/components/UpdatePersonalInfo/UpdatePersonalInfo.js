import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser, clearUpdateUser } from '../../actions/userActions';

import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/formActions';

import FormField from '../FormField';
import Button from '../Button';


export class UpdatePersonalInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Name',
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Lastname',
          name: 'lastname',
          type: 'text',
          placeholder: 'Enter your lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Email',
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
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    const newFormData = populateFields(this.state.formdata, this.props.user.userData);

    this.setState({ formdata: newFormData });
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'update-user');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'update-user');
    let formIsValid = isFormValid(this.state.formdata, 'update-user');

    if (formIsValid) {
      await this.props.dispatch(updateUser(dataToSubmit));

      if (this.props.user.updateUser.success) {
        this.setState(
          { formSuccess: true },
          () => {
            setTimeout(() => {
              this.props.dispatch(clearUpdateUser());

              this.setState({ formSuccess: false });
            }, 2000);
          }
        );
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
            id={ 'name' }
            formdata={ this.state.formdata.name }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

        <div className="form-group">
          <FormField
            id={ 'lastname' }
            formdata={ this.state.formdata.lastname }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

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
                Success
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
          title="Update personal info"
        />
      </form>
    );
  };
};


export default connect(({ user }) => ({
  user
}))(UpdatePersonalInfo);
