import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

import './index.scss';
import { useHistory } from 'react-router-dom';
import { convertObjToURLQuery } from '../../../../../utils/helpers';

const Options = ({ setStep }) => {
  const { push, location: { pathname, search } } = useHistory();

  const skipStep = () => {
    setStep(2);
  };

  const handleSubmit = (values) => {
    const stepSearch = convertObjToURLQuery(values, { initialValue: search });
    push({ pathname, search: stepSearch });
    setStep(2);
  };

  return (
    <div className="options">
      <h1 className="options__title">
        Additional info
      </h1>
      <Form name="options" className="options__form" onFinish={handleSubmit}>
        <Form.Item name="pickup-sign">
          <Input placeholder="Pickup sign" />
        </Form.Item>
        <Form.Item name="reference-code">
          <Input placeholder="Your reference code" />
        </Form.Item>
        <Form.Item name="notes" className="full-width">
          <Input placeholder="Notes" />
        </Form.Item>
        <Form.Item className="full-width">
          <Button onClick={skipStep} type="ghost" ghost>Skip</Button>
          <Button type="primary" htmlType="submit">Continue</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Options.propTypes = {
  setStep: PropTypes.func.isRequired,
};

export default Options;
