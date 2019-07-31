import React from 'react';

import ResetPasswordForm from '../../components/ResetPasswordForm';


export default () => {
  return (
    <div className="container container_vertical-centerer">
      <div className="modal">
        <h1 className="modal__title mt-0">Reset password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
