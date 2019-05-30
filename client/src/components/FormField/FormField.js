import React, { Fragment } from 'react';

import './FormField.scss';


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
