import React, { Fragment } from 'react';


export default ({ id, formdata, change }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="form-error-label">
          { formdata.validationMessage }
        </div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let template = null;

    switch (formdata.element) {
      case 'input':
        template = (
          <Fragment>
            {
              formdata.showLabel ?
                <label className="form-label">
                  { formdata.config.label }
                </label>
              : null
            }

            <input
              { ...formdata.config }
              value={ formdata.value }
              onBlur={ (event) => change({ event, id, blur: true }) }
              onChange={ (event) => change({ event, id }) }
              className="form-field"
            />

            { showError() }
          </Fragment>
        );
        break;

      case 'select':
        template = (
          <Fragment>
            {
              formdata.showLabel ?
                <label className="form-label">
                  { formdata.config.label }
                </label>
              : null
            }

            <select
              value={ formdata.value }
              onBlur={ (event) => change({ event, id, blur: true }) }
              onChange={ (event) => change({ event, id }) }
              className="form-field"
            >
              <option value="">Select one</option>
              {
                formdata.config.options.map((item) => (
                  <option
                    key={ item.key }
                    value={ item.key }
                  >{ item.value }</option>
                ))
              }
            </select>

            { showError() }
          </Fragment>
        );
        break;

      case 'textarea':
        template = (
          <Fragment>
            {
              formdata.showLabel ?
                <label className="form-label">
                  { formdata.config.label }
                </label>
              : null
            }

            <textarea
              { ...formdata.config }
              value={ formdata.value }
              onBlur={ (event) => change({ event, id, blur: true }) }
              onChange={ (event) => change({ event, id }) }
              className="form-field"
            />

            { showError() }
          </Fragment>
        )
        break;

      default:
        template = null;
    }

    return template;
  };

  return (
    <Fragment>
      { renderTemplate() }
    </Fragment>
  );
}
