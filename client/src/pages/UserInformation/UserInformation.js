import React, { Component } from 'react';

import UserLayout from '../../hoc/UserLayout';

import UpdatePersonalInfo from '../../components/UpdatePersonalInfo';


export class UserInformation extends Component {
  render() {
    return (
      <UserLayout>
        <h1 className="mt-0">Profile</h1>
        <UpdatePersonalInfo />
      </UserLayout>
    );
  };
};


export default UserInformation;
