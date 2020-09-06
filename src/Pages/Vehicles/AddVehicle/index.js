import React from 'react';
import { notification } from 'antd';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Form from '../../../Components/shared/Form';
import getFields from '../fields';
import { API } from '../../../constants';

const AddVehicle = () => {
  const { push } = useHistory();
  const { userData: { userType } } = useSelector((state) => state.userData);
  const { fields, initialValues } = getFields(userType);
  const onSubmit = async (values, setIsLoading) => {
    // make the request here.
    try {
      const newValues = {
        ...values,
        carPhoto: 'carPhoto',
        insurancePhoto: 'insurancePhoto',
        licensePhoto: 'licensePhoto',
        motPhoto: 'motPhoto',
        taxRoadPhoto: 'taxRoadPhoto',
        monthlyDepreciation: (values.monthlyDepreciation).toString(),
      };
      await Axios.post(`${API}/Vehicles`, newValues);
      push({
        pathname: '/vehicles',
      });
    } catch (error) {
      notification.error({ message: 'error', duration: 2 });
      setIsLoading(false);
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      formName="add-staff"
      initialValues={initialValues}
      buttonText="Add Vehicle"
    />
  );
};

export default AddVehicle;
