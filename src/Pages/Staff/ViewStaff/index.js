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
    const result = await axios(`${API}/staff`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchStaffData, 'getAllStaff');
  }, []);

  const newData = data.map((row) => {
    return {
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
    };
  });
  return (
    <>
      <div className="table-actions">
        <Link to="/staff/add-new">
          <Button
            size="large"
            className="table-actions__button"
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Staff
          </Button>
        </Link>
        <Link to="/staff/deleted" style={{ marginLeft: 10 }}>
          <Button
            size="large"
            className="table-actions__button"
            type="danger"
          >
            Deleted Staffs
          </Button>
        </Link>
      </div>
      <Table dataSource={newData} columns={columns(setData, newData)} />
    </>
  );
};

export default ViewStaff;
