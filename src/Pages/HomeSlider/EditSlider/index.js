import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import Form from '../../../Components/shared/Form';
import { fields, initialValues } from '../fields';
import asyncHandler from '../../../utils/asyncHandler';
import { API } from '../../../constants';

import './index.scss';

const EditSlider = () => {
  const { id } = useParams();
  const [initial, setData] = useState(initialValues);
  const [disable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlidersData = async () => {
    const result = await axios(`${API}/homeNews/${id}`);
    const { data: { data } } = result;
    setData(data);
    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      firstName: values.name,
      lastName: values.name,
    };
    await axios.put(`${API}/homeNews/${id}`, newValues);
    window.location.reload();
  };

  const enableEdit = () => {
    setEnable(!disable);
  };

  useEffect(() => {
    asyncHandler(fetchSlidersData, 'getDataOneSlider');
  }, []);

  return (
    isLoading ? <Spin spinning />
      : (
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
            fields={fields}
            onSubmit={onSubmit}
            formName="edit-Slider"
            initialValues={initial}
            disabled={disable}
          />
        </>
      )
  );
};

export default EditSlider;
