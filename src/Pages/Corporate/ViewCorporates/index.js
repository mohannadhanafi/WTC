import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import columns from './corporatesData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';
import './index.scss';

const ViewCorporates = () => {
  const [data, setData] = useState([]);

  const fetchCorporatesData = async () => {
    const result = await axios(`${API}/Corporates`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchCorporatesData, 'getAllCorporates');
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
        <Link to="/corporate/deleted" style={{ marginLeft: 10 }}>
          <Button
            size="large"
            className="table-actions__button"
            type="danger"
          >
            Deleted Corporates
          </Button>
        </Link>
      </div>
      <Table activate dataSource={newData} columns={columns(setData, data)} />
    </>
  );
};

export default ViewCorporates;
