import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBrands, addBrand } from '../../actions/productsActions';

import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/formActions';

import FormField from '../../components/FormField';
import Button from '../../components/Button';


export class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'brand',
          type: 'text',
          placeholder: 'Enter the brand'
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
    await this.props.dispatch(getBrands());
  };

  showCategoryList = () => (
    this.props.products.brands ?
      <ul className="theme-list">
        {
          this.props.products.brands.map((brand) => (
            <li
              key={ brand._id }
              className="theme-list__item"
            >{ brand.name }</li>
          ))
        }
      </ul>
    : null
  );

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'products');

    this.setState({
      formError: false,
      formdata: newFormData
    });
  };

  resetForm = () => {
    const newFormData = resetFields(this.state.formdata, 'brands');

    this.setState({
      formSuccess: true,
      formError: false,
      formdata: newFormData
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');

    if (formIsValid) {
      await this.props.dispatch(addBrand(dataToSubmit, this.props.products.brands));

      if (this.props.products.isBrandAdded) {
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
        <h1 className="manage-section__title">Brands</h1>
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
                  title="Add Brand"
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
}))(ManageBrands);
