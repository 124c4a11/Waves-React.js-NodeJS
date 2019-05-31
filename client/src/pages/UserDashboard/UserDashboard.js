import React from 'react';

import UserLayout from '../../hoc/UserLayout';

import Button from '../../components/Button';


export default () => {
  return (
    <UserLayout>
      <section className="info-section">
        <h1 className="info-section__title">User information</h1>
        <div>John</div>
        <div>Doe</div>
        <div>user@user.mail</div>
        <Button
          type="link"
          linkTo="/user/profile"
          title="Edit account info"
          className="mt-1"
        />
      </section>

      <section className="info-section mt-2">
        <h1 className="info-section__title">History purchases</h1>
        <div>history</div>
      </section>
    </UserLayout>
  );
};
