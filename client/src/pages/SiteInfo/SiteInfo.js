import React from 'react';

import UserLayout from '../../hoc/UserLayout';

import UpdateSiteInfo from '../../components/UpdateSiteInfo';


export default () => {
  return (
    <UserLayout>
      <h1 className="mt-0">Site Info</h1>
      <UpdateSiteInfo />
    </UserLayout>
  );
};
