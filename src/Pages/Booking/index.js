import React, { useState } from 'react';
import { Radio } from 'antd';
import { useHistory } from 'react-router-dom';
import OneWay from './Forms/OneWay';
import ByHour from './Forms/ByHour';
import { convertObjToURLQuery } from '../../utils/helpers';
import './index.scss';

const Booking = () => {
  const { push } = useHistory();
  const [rideType, setRideType] = useState('one-way');

  const handleRadioGroup = (e) => {
    setRideType(e.target.value);
  };

  const onSearch = (values) => {
    const dateKeys = ['date', 'time'];
    const search = convertObjToURLQuery(values, { dateKeys });

    push({ pathname: '/booking-process', search });
  };

  return (
    <div className="booking">
      <div className="booking__hero">
        <div className="booking__form-wrapper">
          <div className="booking__form-header">
            <h2>Book a ride</h2>
          </div>
          <div className="booking__form-body">
            <Radio.Group value={rideType} onChange={handleRadioGroup}>
              <Radio value="one-way">One way</Radio>
              <Radio value="by-hour">By the hour</Radio>
            </Radio.Group>
            {rideType === 'one-way'
              ? <OneWay onSearch={onSearch} />
              : <ByHour onSearch={onSearch} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
