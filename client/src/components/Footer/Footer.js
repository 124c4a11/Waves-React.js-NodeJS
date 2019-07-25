import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default ({ siteData }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top-line">
          <span className="logo">WAVES</span>
        </div>
        <div className="footer__bottom-line">
          <div className="footer__col">
            {
              siteData ?
                <Fragment>
                  <h2 className="footer__col-title">Contact information</h2>

                  <ul className="footer__info">
                    {
                      siteData.address ?
                        <li className="footer__info-item">
                          <FontAwesomeIcon icon="compass" className="footer__info-item-icon" />
                          <div className="footer__info-item-descr">
                            <div>Address</div>
                            <address>{ siteData.address }</address>
                          </div>
                        </li>
                      : null
                    }
                    {
                      siteData.phone ?
                        <li className="footer__info-item">
                          <FontAwesomeIcon icon="phone" className="footer__info-item-icon" />
                          <div className="footer__info-item-descr">
                            <div>Phone</div>
                            <div>{ siteData.phone }</div>
                          </div>
                        </li>
                      : null
                    }
                    {
                      siteData.hours ?
                        <li className="footer__info-item">
                          <FontAwesomeIcon icon="clock" className="footer__info-item-icon" />
                          <div className="footer__info-item-descr">
                            <div>Working hours</div>
                            <div>{ siteData.hours }</div>
                          </div>
                        </li>
                      :null
                    }
                    {
                      siteData.email ?
                        <li className="footer__info-item">
                          <FontAwesomeIcon icon="envelope" className="footer__info-item-icon" />
                          <div className="footer__info-item-descr">
                            <div>Email</div>
                            <div>{ siteData.email }</div>
                          </div>
                        </li>
                      : null
                    }
                  </ul>
                </Fragment>
              : null
            }
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
