import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import columns from './tableData/columns';
import { API } from '../../../constants';

import './index.scss';
import asyncHandler from '../../../utils/asyncHandler';

const ViewStaff = () => {
  const [data, setData] = useState([]);

  const fetchStaffData = async () => {
    const result = await axios(`${API}/staff/deleted`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchStaffData, 'getAllStaff');
  }, []);

  const newData = data.map((row) => ({
    ...row,
    firstName: row.user ? row.user.firstName : null,
    phoneNumber: row.user ? row.user.phoneNumber : null,
    type: row.user
      ? (row.user.userType === 9
        ? 'manager'
        : row.user.userType === 6
          ? 'driver'
          : row.user.userType === 7
            ? 'manager'
            : null) : null,
  }));
  return <Table dataSource={newData} columns={columns(setData, newData)} />;
};

export default ViewStaff;
