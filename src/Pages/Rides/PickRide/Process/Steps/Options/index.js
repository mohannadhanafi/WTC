import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Select, Modal,
} from 'antd';

import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { convertObjToURLQuery } from '../../../../../../utils/helpers';

const Options = ({ setStep, toAirport }) => {
  const { userData: { userType } } = useSelector((state) => state.userData);
  const [paymentWay, setPaymentWay] = useState('');
  const [visible, setVisible] = useState(false);
  const skipStep = () => {
    setStep(2);
  };
  const handleChangePaymentWay = (value) => {
    setPaymentWay(value);
  };
  const { Option } = Select;
  const { push, location: { pathname, search } } = useHistory();

  const handleSubmit = (values) => {
    if (paymentWay === 'complementary' || paymentWay === 'remainning') {
      setVisible(true);
    } else {
      const stepSearch = convertObjToURLQuery(values, { initialValue: search });
      push({ pathname, search: stepSearch });
      setStep(2);
    }
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
        {toAirport ? (
          <Form.Item name="payment" className="full-width">
            <Select placeholder="Payment Way" onChange={handleChangePaymentWay}>
              {userType === '3' ? <Option value="complementary">Complementary</Option> : null}
              <Option value="amountCreditLimit">Amount Credit Limit</Option>
              <Option value="ridePayment">Ride Payment</Option>
            </Select>
          </Form.Item>
        ) : null}
        <Form.Item name="notes" className="full-width">
          <Input placeholder="Notes" />
        </Form.Item>
        <Form.Item className="full-width">
          {paymentWay === 'complementary' || paymentWay === 'amountCreditLimit' ? null : (
            <Button onClick={skipStep} type="ghost" ghost>Skip</Button>
          )}
          <Button type="primary" htmlType="submit">Continue</Button>
        </Form.Item>
      </Form>
      <Modal
        onOk={() => {
          window.location.href = '/rides';
        }}
        visible={visible}
      >
        <p>{`Are you sure you want pay from ${paymentWay}?`}</p>
      </Modal>
    </div>
  );
};

Options.propTypes = {
  setStep: PropTypes.func.isRequired,
  toAirport: PropTypes.bool,
};

Options.defaultProps = {
  toAirport: false,
};

export default Options;
