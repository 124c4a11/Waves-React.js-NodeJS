import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const links = [
  {
    name: 'My Account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User information',
    linkTo: '/user/profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];

const adminLinks = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add product',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories'
  }
];


const UserLayout = (props) => {
  const generateListItems = (links) => {
    return links.map((link, ndx) => {
      return (
        <li key={ ndx } className="layout-sidebar__list-item">
          <Link
            to={ link.linkTo }
            className="layout-sidebar__list-link"
          >{ link.name }</Link>
        </li>
      );
    });
  };

  return (
    <div className="container d-flex">
      <div className="layout-sidebar">
        <h2 className="layout-sidebar__title mt-0">My account</h2>
        <ul className="layout-sidebar__list">
          { generateListItems(links) }
        </ul>
        {
          props.user.userData.isAdmin ?
            <Fragment>
              <h2 className="layout-sidebar__title">Admin</h2>
              <ul className="layout-sidebar__list">
                { generateListItems(adminLinks) }
              </ul>
            </Fragment>
          : null
        }
      </div>
      <div className="layout-content">
        { props.children }
      </div>
    </div>
  );
};


export default connect(({ user }) => ({
  user
}))(UserLayout);
