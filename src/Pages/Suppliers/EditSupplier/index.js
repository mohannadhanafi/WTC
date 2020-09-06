import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import Form from '../../../Components/shared/Form';
import { fields, initialValues } from '../fields';
import asyncHandler from '../../../utils/asyncHandler';
import { API } from '../../../constants';

import './index.scss';
import PaymentSettings from '../../../Components/shared/PaymentSettings';

const EditSupplier = () => {
  const { id } = useParams();
  const [initial, setData] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [disable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  const fetchSuppliersData = async () => {
    const result = await axios(`${API}/suppliers/${id}`);
    const { data: { data } } = result;
    const newData = {
      ...data,
      firstName: data.user.firstName,
      supplierTypeId: (data.supplierType.id).toString(),
      supplierAvailabilityId: data.supplierAvailability && (data.supplierAvailability.id).toString(),
      countryId: (data.country.id).toString(),
      cityId: (data.city.id).toString(),
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
    };
    setData(newData);
    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      lastName: values.firstName,
    };
    await axios.put(`${API}/suppliers/${id}`, newValues);
    window.location.reload();
  };

  const enableEdit = () => {
    setEnable(!disable);
  };

  useEffect(() => {
    asyncHandler(fetchSuppliersData, 'getDataOneSupplier');
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
            formName="edit-supplier"
            initialValues={initial}
            disabled={disable}
          />
          <PaymentSettings
            visible={visible}
            handleCancel={() => { setVisible(false); }}
            url="suppliersPrices"
            typeId="supplierId"
          />
        </>
      )
  );
};

export default EditSupplier;
