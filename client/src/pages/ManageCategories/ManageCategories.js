import React from 'react';

import UserLayout from '../../hoc/UserLayout';

import ManageBrands from '../../components/ManageBrands';
import ManageWoods from '../../components/ManageWoods';


const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageWoods />
    </UserLayout>
  );
};


export default ManageCategories;
