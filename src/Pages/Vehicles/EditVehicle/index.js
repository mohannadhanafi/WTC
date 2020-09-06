import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Form from '../../../Components/shared/Form';
import getFields from '../fields';
import asyncHandler from '../../../utils/asyncHandler';
import { API } from '../../../constants';

import './index.scss';

const EditVehicle = () => {
  const { id } = useParams();
  const { userData: { userType } } = useSelector((state) => state.userData);
  const { fields, initialValues } = getFields(userType);
  const [initial, setData] = useState(initialValues);
  const [disable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  const fetchVehiclesData = async () => {
    const result = await axios(`${API}/vehicles/${id}`);
    const { data: { data } } = result;
    const carOptions = data.carOptions.map((item) => (item.id).toString());
    const newData = {
      ...data,
      carAvailabilityId: data.carAvailability && (data.carAvailability.id).toString(),
      fleetTypeId: data.fleetType && (data.fleetType.id).toString(),
      locationId: data.location && (data.location.id).toString(),
      vehicleColorId: data.vehicleColor && (data.vehicleColor.id).toString(),
      vehicleNameId: data.vehicleName && (data.vehicleName.id).toString(),
      vehicleTypeId: data.vehicleType && (data.vehicleType.id).toString(),
      insuranceTypeId: data.insuranceType && (data.insuranceType.id).toString(),
      driverId: data.driver ? (data.driver.id).toString() : data.driverId,
      carOptions,
      acquisitionData: moment(data.acquisitionData),
      expireInsurance: moment(data.expireInsurance),
      expireLicenses: moment(data.expireLicenses),
      expireTaxRoad: moment(data.expireTaxRoad),
      expireMot: moment(data.expireMot),
    };
    setData(newData);
    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      monthlyDepreciation: (values.monthlyDepreciation).toString(),
      driverId: (values.driverId).toString(),
    };
    await axios.put(`${API}/vehicles/${id}`, newData);
    window.location.reload();
  };

  const enableEdit = () => {
    setEnable(!disable);
  };

  useEffect(() => {
    asyncHandler(fetchVehiclesData, 'getDataOneVehicle');
  }, []);

  if (isLoading) {
    return <Spin spinning />;
  }

  const newFields = fields.filter((element) => element.name !== 'locationId');

  return (
    <>
      <div className="edit-header">
        <Button
          onClick={enableEdit}
          size="large"
          type={disable ? 'primary' : 'danger'}
          className="edit-header__button"
        >
          {disable ? 'Edit' : 'Cancel'}
        </Button>
      </div>
      <Form
        fields={newFields}
        onSubmit={onSubmit}
        formName="edit-vehicle"
        initialValues={initial}
        disabled={disable}
      />
    </>
  );
};

export default EditVehicle;
