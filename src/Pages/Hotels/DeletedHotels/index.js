import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import columns from './hotelsData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';

const ViewHotels = () => {
  const [data, setData] = useState([]);

  const fetchHotelsData = async () => {
    const result = await axios(`${API}/Hotels/deleted`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchHotelsData, 'getAllHotels');
  }, []);
  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    cityName: row.city ? row.city.name : null,
    clientType: row.clientType ? row.clientType.name : null,
  }));

  return <Table activate dataSource={newData} columns={columns(setData, data)} />;
};

export default ViewHotels;
