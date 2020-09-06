import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import Form from '../../../Components/shared/Form';
import { fields, initialValues } from '../fields';
import asyncHandler from '../../../utils/asyncHandler';
import { API } from '../../../constants';
import PaymentSettings from '../../../Components/shared/PaymentSettings';

import './index.scss';

const EditHotel = () => {
  const { id } = useParams();
  const [initial, setData] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [disable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHotelsData = async () => {
    const result = await axios(`${API}/hotels/${id}`);
    const { data: { data } } = result;
    const newData = {
      ...data,
      firstName: data.user.firstName,
      clientTypeId: (data.clientType.id).toString(),
      countryId: (data.country.id).toString(),
      cityId: (data.city.id).toString(),
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
      carComplementaryId: data.carComplementary && (data.carComplementary.id).toString(),
      positionCarComplementaryId: data.positionCarComplementary && (data.positionCarComplementary.id).toString(),
      shareRevenueId: data.positionCarComplementary && (data.positionCarComplementary.id).toString(),
      clientAvailabilityId: data.clientAvailability && (data.clientAvailability.id).toString(),
    };
    setData(newData);
    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    const newValues = { ...values };
    delete newValues.name;
    Object.keys(newValues).map((item) => {
      if (!newValues[item]) {
        delete newValues[item];
      }
      return null;
    });
    await axios.put(`${API}/hotels/${id}`, newValues);
    window.location.reload();
  };

  const enableEdit = () => {
    setEnable(!disable);
  };

  useEffect(() => {
    asyncHandler(fetchHotelsData, 'getDataOneHotel');
  }, []);
  const showModal = () => {
    setVisible(true);
  };
  return (
    isLoading ? <Spin spinning />
      : (
        <>
          <div className="edit-header">
            <Button
              onClick={showModal}
              size="large"
              type="primary"
              style={{ marginRight: 10 }}
            >
              Payment Settings
            </Button>
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
            fields={fields}
            onSubmit={onSubmit}
            formName="edit-hotel"
            initialValues={initial}
            disabled={disable}
          />
          <PaymentSettings
            visible={visible}
            handleCancel={() => { setVisible(false); }}
            url="hotelsPrices"
            typeId="hotelId"
          />
        </>
      )
  );
};

export default EditHotel;
