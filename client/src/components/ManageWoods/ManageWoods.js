import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWoods, addWood } from '../../actions/productsActions';

import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/formActions';

import FormField from '../../components/FormField';
import Button from '../../components/Button';


export class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'wood',
          type: 'text',
          placeholder: 'Enter the wood'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  async componentDidMount() {
    await this.props.dispatch(getWoods());
  };

  showCategoryList = () => (
    this.props.products.woods ?
      <ul className="theme-list">
        {
          this.props.products.woods.map((wood) => (
            <li
              key={ wood._id }
              className="theme-list__item"
            >{ wood.name }</li>
          ))
        }
      </ul>
    : null
  );

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'woods');

    this.setState({
      formError: false,
      formdata: newFormData
    });
  };

  resetForm = () => {
    const newFormData = resetFields(this.state.formdata, 'woods');

    this.setState({
      formSuccess: true,
      formError: false,
      formdata: newFormData
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'woods');
    let formIsValid = isFormValid(this.state.formdata, 'woods');

    if (formIsValid) {
      await this.props.dispatch(addWood(dataToSubmit, this.props.products.woods));

      if (this.props.products.isWoodAdded) {
        this.resetForm();
      } else {
        this.setState({ formError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <section className="manage-section">
        <h2 className="manage-section__title">Woods</h2>
        <div className="manage-section__row">
          <div className="manage-section__list-wrap">
            { this.showCategoryList() }
          </div>
          <div className="manage-section__form-wrap">
            <form onSubmit={ (e) => this.onSubmit(e) }>
              <FormField
                id={ 'name' }
                formdata={ this.state.formdata.name }
                change={ (element) => this.onUpdateForm(element) }
              />

              {
                this.state.formError ?
                  <div className="form-group">
                    <div className="form-error-label">
                      Please check your data
                    </div>
                  </div>
                : null
              }

              <div className="form-group">
                <Button
                  type="submit"
                  title="Add Wood"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };
};


export default connect(({ products }) => ({
  products
}))(ManageWoods);
