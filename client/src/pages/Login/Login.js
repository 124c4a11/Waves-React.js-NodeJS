import React from 'react';

import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm'


export default () => {
  return (
    <div className="container container_vertical-centerer">
      <div className="modal modal_flex">
        <div className="modal__col modal__col_order-sm-1">
          <h2 className="modal__title mt-0">New Customers</h2>
          <p>Fugiat non ipsum adipisicing cillum et eiusmod Lorem pariatur in occaecat nisi. Duis non excepteur quis sint enim. Commodo sit dolor eu sit sit in ullamco. Commodo ullamco sint deserunt nisi ex sint nostrud sunt quis. Ea incididunt dolor nulla commodo nostrud magna qui enim quis commodo ipsum. Ut laborum magna dolor duis incididunt excepteur aliqua anim esse ea in.</p>

          <Button
            type="link"
            title="Create an account"
            linkTo="/register"
          />
        </div>
        <div className="modal__col">
          <h2 className="modal__title mt-0">Registered Customers</h2>
          <p>If you have an account please log in.</p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};
