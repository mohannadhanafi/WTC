import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './index.scss';

const ServiceClass = ({ onClickSelect }) => (
  <div className="service-class">
    <div className="service-class__cards">
      <div className="service-class__card">
        <div className="service-class__card-header">
          <h1 className="service-class__card-header-class">Business Class</h1>
          <p className="service-class__card-header-class-type">Mercedes-Benz E-Class, BMW 5 Series, Cadillac XTS or similar</p>
        </div>
        <div className="service-class__card-body">
          <div className="service-class__card-body-features">
            <p className="service-class__card-body-feature">Includes Meet & Greet</p>
            <p className="service-class__card-body-feature">Free cancellation up until 24 hours before pickup</p>
          </div>
          <div className="service-class__card-body-img">
            place
          </div>
          <div className="service-class__card-body-price-box">
            <p className="service-class__card-body-price">100.76 EUR</p>
            <i className="service-class__card-body-note">All prices include VAT, fees & tip.</i>
            <Button type="primary" className="service-class__card-body-cta" onClick={() => onClickSelect(1)}>Select</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ServiceClass.propTypes = {
  onClickSelect: PropTypes.func.isRequired,
};

export default ServiceClass;
