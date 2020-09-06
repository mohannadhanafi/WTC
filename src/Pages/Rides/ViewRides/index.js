import React, { useState, useEffect } from 'react';
import { Table, Button, DatePicker } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CarFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import columns from './RideData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';
import './index.scss';

const ViewRides = () => {
  const { userData: { userType } } = useSelector((state) => state.userData);
  const [data, setData] = useState({
    rides: [],
    amountCredit: 0,
    freeRides: 0,
  });

  const fetchRidesData = async () => {
    const result = await axios.get(`${API}/${userType === '3' ? 'hotels' : 'corporates'}/rides`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchRidesData, 'getAllRides');
  }, []);

  const chooseMonth = async (value) => {
    const result = await axios.get(`${API}/${userType === '3' ? 'hotels' : 'corporates'}/rides?date=${moment(value)}`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };
  return (
    <>
      <div className="table-actions-ride">
        <div className="left-side">
          <DatePicker style={{ marginBottom: 8 }} onChange={chooseMonth} placeholder="choose month" picker="month" />
          {userType === '3' ? (
            <h1>
              Complementry:
              {' '}
              {data.amountCredit}
            </h1>
          ) : null}
          <h1>
            Amount Credit Limit:
            {' '}
            {data.amountCredit}
          </h1>
        </div>
        <Link to="/rides/pick-ride">
          <Button
            size="large"
            className="table-actions__button"
            type="primary"
            icon={<CarFilled />}
          >
            Book A Ride
          </Button>
        </Link>
      </div>
      <Table dataSource={data.rides} columns={columns(data.rides, setData)} />
    </>
  );
};

export default ViewRides;
