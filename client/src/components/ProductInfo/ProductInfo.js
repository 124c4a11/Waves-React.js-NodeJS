import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';


export default ({ detail }) => {
  return (
    <Fragment>
      <h1 className="mt-0">{ detail.brand.name } { detail.name }</h1>
      <p>{ detail.description }</p>
      <div className="mt-2">
        {
          detail.shipping ?
            <div className="tag">
              <div className="tag__icon">
                <FontAwesomeIcon icon={ faTruck } />
              </div>
              <div className="tag__text">
                <p>Free shipping</p>
                <p>And return</p>
              </div>
            </div>
          :null
        }
        {
          detail.available ?
            <div className="tag">
              <div className="tag__icon">
                <FontAwesomeIcon icon={ faCheck } />
              </div>
              <div className="tag__text">
                <p>Not Available</p>
                <p>Preorder only</p>
              </div>
            </div>
          :null
        }
      </div>

      <hr className="divider-secondary" />

      <h2>Specifications</h2>
      <p className="specification my-0"><strong>Frets:</strong> { detail.frets }</p>
      <p className="specification my-0"><strong>Wood:</strong> { detail.wood.name }</p>

      <hr className="divider-secondary" />

      <div className="h1 mb-1">{ `$ ${detail.price}` }</div>
      <Button
        title="Add to cart"
        runAction={ () => console.log('Add to cart') }
      />
    </Fragment>
  );
};
