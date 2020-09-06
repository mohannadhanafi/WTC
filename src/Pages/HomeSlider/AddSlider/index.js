import React from 'react';
import Axios from 'axios';
import { notification } from 'antd';
import Form from '../../../Components/shared/Form';
import { fields, initialValues } from '../fields';

import { API } from '../../../constants';

const AddSlider = () => {
  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      // picture: values.picture[0].name,
      picture: 'testPicture',
    };
    await Axios.post(`${API}/homeNews`, newValues);
    notification.success({ message: 'The new was added successfully', duration: 3 });
    window.location.href = '/homeNews';
  };

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      formName="add-slider"
      initialValues={initialValues}
      buttonText="Add Slider"
      className="homeNews"
    />
  );
};

export default AddSlider;
