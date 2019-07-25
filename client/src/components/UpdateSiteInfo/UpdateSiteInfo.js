import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getSiteData,
  updateSiteData
} from '../../actions/siteActions';

import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/formActions';

import FormField from '../FormField';
import Button from '../Button';


export class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours',
          type: 'text',
          placeholder: 'Enter the site working hours'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone nubmer',
          name: 'phone',
          type: 'text',
          placeholder: 'Enter the phone number'
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
          label: 'Shop email',
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

  async componentDidMount() {
    await this.props.dispatch(getSiteData());

    const { siteData } = this.props;

    if (siteData) {
      const newFormData = populateFields(this.state.formdata, siteData);

      this.setState({ formdata: newFormData });
    }
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'site-info');

    this.setState({
      formError: false,
      formdata: newFormData
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'site-info');
    let formIsValid = isFormValid(this.state.formdata, 'site-info');

    if (formIsValid) {
      await this.props.dispatch(updateSiteData(dataToSubmit));

      const { success } = this.props;

      if (success) {
        this.setState(
          { formSuccess: success },
          () => {
            setTimeout(() => {
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
            id={ 'address' }
            formdata={ this.state.formdata.address }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

        <div className="form-group">
          <FormField
            id={ 'hours' }
            formdata={ this.state.formdata.hours }
            change={ (element) => this.onUpdateForm(element) }
          />
        </div>

        <div className="form-group">
          <FormField
            id={ 'phone' }
            formdata={ this.state.formdata.phone }
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
          title="Update site info"
        />
      </form>
    );
  };
};


export default connect(({ site }) => ({
  success: site.success,
  siteData: site.siteData
}))(UpdateSiteInfo);

