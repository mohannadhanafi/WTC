import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import columns from './hotelsData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';
import './index.scss';

const ViewHotels = () => {
  const [data, setData] = useState([]);

  const fetchHotelsData = async () => {
    const result = await axios(`${API}/Hotels`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchHotelsData, 'getAllHotels');
  }, []);

  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    status: row.user ? row.user.activated : null,
    cityName: row.city ? row.city.name : null,
    clientType: row.clientType ? row.clientType.name : null,
  }));

  return (
    <>
      <div className="table-actions">
        <Link to="/hotels/deleted" style={{ marginLeft: 10 }}>
          <Button
            size="large"
            className="table-actions__button"
            type="danger"
          >
            Deleted Hotels
          </Button>
        </Link>
      </div>
      <Table activate dataSource={newData} columns={columns(setData, data)} />
    </>
  );
};

export default ViewHotels;
