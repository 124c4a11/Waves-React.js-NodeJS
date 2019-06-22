import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../actions/productsActions';

import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from '../../utils/formActions';

import FormField from '../../components/FormField'
import Button from '../../components/Button'

import UserLayout from '../../hoc/UserLayout';


class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name',
          type: 'text',
          placeholder: 'Enter product name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'name',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brands',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },

      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  };

  async componentDidMount() {
    const formdata = this.state.formdata;

    await this.props.dispatch(getBrands());
    await this.props.dispatch(getWoods());

    const newFormDataWithBrands = populateOptionFields(formdata, this.props.products.brands, 'brand');

    const newFormDataWithWoods = populateOptionFields(formdata, this.props.products.woods, 'wood');

    this.updateFields(newFormDataWithBrands);
    this.updateFields(newFormDataWithWoods);
  };

  updateFields = (formdata) => {
    this.setState({ formdata });
  };

  resetForm = () => {
    const newFormData = resetFields(this.state.formdata, 'products');

    this.setState({
      formSuccess: true,
      formError: false,
      formdata: newFormData
    });

    setTimeout(() => {
      this.setState(
        { formSuccess: false },
        () => this.props.dispatch(clearProduct())
      );
    }, 3000);
  };

  onUpdateForm = (element) => {
    const newFormData = update(element, this.state.formdata, 'products');

    this.setState({
      formError: false,
      formdata: newFormData
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if (formIsValid) {
      await this.props.dispatch(addProduct(dataToSubmit));

      if (this.props.products.addProduct.success) {
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
      <UserLayout>
        <Fragment>
          <h1 className="mt-0">Add Product</h1>

          <form onSubmit={ (e) => this.onSubmit(e)}>
            <div className="form-group">
              <FormField
                id={ 'name' }
                formdata={ this.state.formdata.name }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'description' }
                formdata={ this.state.formdata.description }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'price' }
                formdata={ this.state.formdata.price }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>

            <hr className="divider" />

            <div className="form-group">
              <FormField
                id={ 'brand' }
                formdata={ this.state.formdata.brand }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'wood' }
                formdata={ this.state.formdata.wood }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'frets' }
                formdata={ this.state.formdata.frets }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'shipping' }
                formdata={ this.state.formdata.shipping }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>
            <div className="form-group">
              <FormField
                id={ 'available' }
                formdata={ this.state.formdata.available }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>

            <hr className="divider" />

            <div className="form-group">
              <FormField
                id={ 'publish' }
                formdata={ this.state.formdata.publish }
                change={ (element) => this.onUpdateForm(element) }
              />
            </div>

            <hr className="divider" />

            {
              this.state.formSuccess ?
                <div className="form-group">
                  <div className="form-success-label">
                    Product successfully added!
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
              : null
            }

            <Button
              type="submit"
              title="Add Product"
            />
          </form>
        </Fragment>
      </UserLayout>
    );
  }
}


export default connect(({ products }) => ({
  products
}))(AddProduct);
