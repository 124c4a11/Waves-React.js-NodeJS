import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';


export default (props) => {
  const buttons = () => {
    let template = '';

    switch (props.type) {
      case 'link':
        template = <Link
          className="btn"
          to={ props.linkTo }
          { ...props.addStyles }
        >{ props.title }</Link>

        break;

      case 'submit':
        template = <button
          type={ props.type }
          className="btn"
          { ...props.addStyles }
        >{ props.title }</button>;

        break;

      default:
        template = <button
          className="btn"
          { ...props.addStyles }
        >{ props.title }</button>;
    }

    return template;
  };

  return (
    <Fragment>
      { buttons() }
    </Fragment>
  );
};
