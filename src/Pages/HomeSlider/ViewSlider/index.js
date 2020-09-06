import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import columns from './sliderData/columns';
import { API } from '../../../constants';

import asyncHandler from '../../../utils/asyncHandler';

import './index.scss';

const ViewSliders = () => {
  const [data, setData] = useState([]);

  const fetchSlidersData = async () => {
    const result = await axios(`${API}/homeNews`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchSlidersData, 'getAllSliders');
  }, []);

  return (
    <>
      <div className="table-actions">
        <Link to="/homeNews/add-new">
          <Button
            size="large"
            className="table-actions__button"
            type="primary"
            icon={<PlusOutlined />}
          >
            Add New
          </Button>
        </Link>
      </div>
      <Table activate dataSource={data} columns={columns(setData, data)} />
    </>
  );
};

export default ViewSliders;
