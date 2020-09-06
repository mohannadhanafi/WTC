import React from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from '../../../Components/shared/Form';
import getFields from '../fields';

import { API } from '../../../constants';

const AddStaff = () => {
  const { userData: { userType } } = useSelector((state) => state.userData);
  const { fields, initialValues } = getFields(userType);
  const { push } = useHistory();
  const onSubmit = async (values, setIsLoading) => {
    try {
      const typeofstaffResults = await axios.get(`${API}/typeofstaff`);
      const { data: { data: typeofstaffData } } = typeofstaffResults;
      const typeofstaffArray = typeofstaffData.filter((item) => item.name === values.typeofstaffId);
      const driverAvailabilityResults = await axios.get(`${API}/driverAvailability`);
      const { data: { data: driverAvailabilityData } } = driverAvailabilityResults;
      const driverAvailabilityArray = driverAvailabilityData.filter((item) => item.name === values.driverAvailabilityId);
      const newValues = {
        ...values,
        typeofstaffId: typeofstaffArray[0] ? ((typeofstaffArray[0].id).toString()) : null,
        driverAvailabilityId: driverAvailabilityArray[0] ? ((driverAvailabilityArray[0].id).toString()) : null,
        age: Number(((values.age).split(' '))[0]),
        licensesStatus: values.licensesStatus ? (values.licensesStatus === 'valid' ? true : values.licensesStatus === 'expired' ? false : null) : null,
      };
      if (values.staffTypeId === '6') {
        delete newValues.staffTypeId;
        await axios.post(`${API}/drivers`, newValues);
        push({
          pathname: '/staff',
        });
      } else {
        delete newValues.licensesStatus;
        await axios.post(`${API}/staffProfessions`, newValues);
        push({
          pathname: '/staff',
        });
      }
    } catch (error) {
      if (error.response) {
        notification.error({ message: error.response.data.message || error.response.data.message[0].message, duration: 2 });
      }
      setIsLoading(false);
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      formName="add-staff"
      initialValues={initialValues}
      buttonText="Add Staff"
    />
  );
};

export default AddStaff;
