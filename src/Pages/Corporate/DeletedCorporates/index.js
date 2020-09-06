import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import columns from './corporatesData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';

const ViewCorporates = () => {
  const [data, setData] = useState([]);

  const fetchCorporatesData = async () => {
    const result = await axios(`${API}/Corporates/deleted`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchCorporatesData, 'getAllCorporates');
  }, []);

  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    cityName: row.city ? row.city.name : null,
    clientType: row.clientType ? row.clientType.name : null,
  }));

  return (
    <Table activate dataSource={newData} columns={columns(setData, data)} />
  );
};

export default ViewCorporates;
