import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../constants';
import columns from './VehiclesData/columns';

import asyncHandler from '../../../utils/asyncHandler';

import './index.scss';


const ViewVehicles = () => {
  const [data, setData] = useState([]);

  const fetchVehiclesData = async () => {
    const result = await axios(`${API}/vehicles`);
    const { data: { data: finalData } } = result;
    setData(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchVehiclesData, 'getAllVehicles');
  }, []);

  const newData = data.map((row) => ({
    ...row,
    vehicleName1: row.vehicleName ? row.vehicleName.name : null,
    vehicleColor1: row.vehicleColor ? row.vehicleColor.name : null,
  }));

  return (
    <>
      <div className="table-actions">
        <Link to="/vehicle/add-new">
          <Button
            size="large"
            className="table-actions__button"
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Vehicle
          </Button>
        </Link>
        <Link to="/vehicle/deleted" style={{ marginLeft: 10 }}>
          <Button
            size="large"
            className="table-actions__button"
            type="danger"
          >
            Deleted Vehicles
          </Button>
        </Link>
      </div>
      <Table dataSource={newData} columns={columns(setData, data)} />
    </>
  );
};

export default ViewVehicles;
