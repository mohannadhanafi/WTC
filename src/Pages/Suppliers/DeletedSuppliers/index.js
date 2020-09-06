import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import columns from './suppliersData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';

const DeletedSuppliers = () => {
  const [data, setData] = useState([]);

  const fetchSuppliersData = async () => {
    const result = await axios(`${API}/suppliers/deleted`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchSuppliersData, 'getDeletedHotels');
  }, []);
  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    cityName: row.city ? row.city.name : null,
    countryName: row.country ? row.country.name : null,
    supplierType: row.supplierType ? row.supplierType.name : null,
  }));

  return <Table activate dataSource={newData} columns={columns(setData, data)} />;
};

export default DeletedSuppliers;
