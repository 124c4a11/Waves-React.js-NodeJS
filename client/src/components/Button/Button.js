import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'


export default (props) => {
  const buttons = () => {
    let template = '';

    const classname = props.className
      ? `btn ${props.className}`
      : `btn`;

    switch (props.type) {
      case 'link':
        template = <Link
          className={ classname }
          to={ props.linkTo || '' }
          { ...props.addStyles }
        >{ props.title }</Link>

        break;

      case 'submit':
        template = <button
          type={ props.type }
          className={ classname }
          { ...props.addStyles }
        >{ props.title }</button>;

        break;

      case 'bag-link':
        template = <button
          onClick={ () => props.runAction() }
          className={ classname }
        ><FontAwesomeIcon icon={ faShoppingBag } /></button>

        break;

      default:
        template = <button
          className={ classname }
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
