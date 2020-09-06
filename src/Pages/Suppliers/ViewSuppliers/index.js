import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../../constants';
import columns from './suppliersData/columns';

import asyncHandler from '../../../utils/asyncHandler';
import './index.scss';


const ViewSuppliers = () => {
  const [data, setData] = useState([]);

  const fetchSuppliersData = async () => {
    const result = await axios(`${API}/suppliers`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };
  useEffect(() => {
    asyncHandler(fetchSuppliersData, 'getAllSuppliers');
  }, []);

  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    cityName: row.city ? row.city.name : null,
    countryName: row.country ? row.country.name : null,
    supplierType: row.supplierType ? row.supplierType.name : null,
    status: row.user ? row.user.activated : null,
  }));

  return (
    <>
      <div className="table-actions">
        <Link to="/suppliers/deleted" style={{ marginLeft: 10 }}>
          <Button
            size="large"
            className="table-actions__button"
            type="danger"
          >
            Deleted Hotels
          </Button>
        </Link>
      </div>
      <Table dataSource={newData.length && newData} columns={columns(setData, data)} />
    </>
  );
};

export default ViewSuppliers;
