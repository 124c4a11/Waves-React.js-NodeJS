import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


export default () => {
  return (
    <div className="container not-found">
      <div className="not-found__msg">
        <FontAwesomeIcon
          className="not-found__icon"
          icon={ faExclamationCircle }
        />
        <p>Oops!! Page not found!</p>
      </div>
    </div>
  )
};
