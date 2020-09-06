import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { API } from '../../../constants';
import columns from './VehiclesData/columns';

import asyncHandler from '../../../utils/asyncHandler';

import './index.scss';


const ViewVehicles = () => {
  const [data, setData] = useState([]);

  const fetchVehiclesData = async () => {
    const result = await axios(`${API}/vehicles/deleted`);
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

  return <Table dataSource={newData} columns={columns(setData, data)} />;
};

export default ViewVehicles;
