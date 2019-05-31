import React from 'react';
import { Link } from 'react-router-dom';


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


export default (props) => {
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
      </div>
      <div className="layout-content">
        { props.children }
      </div>
    </div>
  );
};
