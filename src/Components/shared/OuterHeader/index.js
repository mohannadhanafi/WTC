import React from 'react';

import './index.scss';
import { Link } from 'react-router-dom';

const OuterHeader = () => (
  <div className="outer-header">
    <div className="container">
      <div className="row">
        <div className="outer-header__left-menu">
          <div className="outer-header__logo">
            <Link to="/">
              <img src="/images/wtc-logo.png" alt="wtc logo" />
            </Link>
          </div>
        </div>
        <div className="outer-header__right-menu">
          <ul className="outer-header__nav-links">
            <li className="outer-header__nav-link">
              <Link to="/login">Login</Link>
            </li>
            <li className="outer-header__nav-link">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default OuterHeader;
