import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.scss';


export default () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top-line">
          <span className="logo">WAVES</span>
        </div>
        <div className="footer__bottom-line">
          <div className="footer__col">
            <h2 className="footer__col-title">Contact information</h2>
            <ul className="footer__info">
              <li className="footer__info-item">
                <FontAwesomeIcon icon="compass" className="footer__info-item-icon" />
                <div className="footer__info-item-descr">
                  <div>Address</div>
                  <div>Kramer 456</div>
                </div>
              </li>
              <li className="footer__info-item">
                <FontAwesomeIcon icon="phone" className="footer__info-item-icon" />
                <div className="footer__info-item-descr">
                  <div>Phone</div>
                  <div>12345-34567</div>
                </div>
              </li>
              <li className="footer__info-item">
                <FontAwesomeIcon icon="clock" className="footer__info-item-icon" />
                <div className="footer__info-item-descr">
                  <div>Working hours</div>
                  <div>Mon-Sun/9am-8pm</div>
                </div>
              </li>
              <li className="footer__info-item">
                <FontAwesomeIcon icon="envelope" className="footer__info-item-icon" />
                <div className="footer__info-item-descr">
                  <div>Email</div>
                  <div>info@waves.com</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="footer__col-title">Be the first to know</h2>
            <p>Get all the latest information on events, sales and offers. You can miss out.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
