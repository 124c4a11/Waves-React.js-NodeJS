import React from 'react';

import UserLayout from '../../hoc/UserLayout';

import Button from '../../components/Button';
import HistoryTable from '../../components/HistoryTable';


export default (props) => {
  const {
    name,
    lastname,
    email,
    history
  } = props.user

  return (
    <UserLayout>
      <section className="info-section">
        <h1 className="info-section__title">User information</h1>
        <div>{ name }</div>
        <div>{ lastname }</div>
        <div>{ email }</div>
        <Button
          type="link"
          linkTo="/user/profile"
          title="Edit account info"
          className="mt-1"
        />
      </section>

      {
        history && history.length ?
          <section className="info-section mt-2">
            <h2 className="info-section__title">History purchases</h2>
            <HistoryTable products={ history } />
          </section>
        : null
      }
    </UserLayout>
  );
};
