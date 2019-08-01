import React from 'react';

import ChangePasswordForm from '../../components/ChangePasswordForm';


export default () => {
  return (
    <div className="container container_vertical-centerer">
      <div className="modal">
        <h1 className="modal__title mt-0">Change password</h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};
