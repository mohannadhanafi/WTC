import React, { useState } from 'react';
import {
  Form, Button, DatePicker, Input,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import GooglePlacesInput from '../../../../Components/shared/GooglePlacesInput';

const format = 'hh:mm A';

const OneWay = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [toAirport, setToAirport] = useState(false);

  const getAirPortValue = (airport) => {
    if (airport) setToAirport(true);
  };

  return (
    <Form
      form={form}
      name="one-way"
      onFinish={onSearch}
      initialValues={{
        date: moment(),
        time: moment(new Date(), format),
      }}
    >
      <Form.Item name="from" rules={[{ required: true, message: 'Please enter a location.' }]}>
        <GooglePlacesInput
          setFieldsValue={form.setFieldsValue}
          name="from"
          placeholder="From"
        />
      </Form.Item>
      <Form.Item name="to" rules={[{ required: true, message: 'Please enter a location.' }]}>
        <GooglePlacesInput
          setFieldsValue={form.setFieldsValue}
          name="to"
          placeholder="To"
          getAirPortValue={getAirPortValue}
        />
      </Form.Item>
      {toAirport ? (
        <>
          <Form.Item name="flightNumber" rules={[{ required: true }]}>
            <Input placeholder="Flight Number" />
          </Form.Item>
          <Form.Item name="flightDate" rules={[{ required: true }]}>
            <DatePicker format="ddd ,MMM DD, YYYY" placeholder="Flight Date" />
          </Form.Item>
          <Form.Item name="flightCarrier" rules={[{ required: true }]}>
            <Input placeholder="Flight Carrier" />
          </Form.Item>
          <Form.Item name="flightDetails" rules={[{ required: true }]}>
            <Input placeholder="Flight Details" />
          </Form.Item>
        </>
      ) : null}
      <Form.Item name="date" rules={[{ required: true }]}>
        <DatePicker format="ddd ,MMM DD, YYYY" />
      </Form.Item>
      <Form.Item name="time" rules={[{ required: true }]}>
        <DatePicker.TimePicker format={format} use12Hours showSecond={false} />
      </Form.Item>
      <Form.Item className="submit-btn">
        <Button htmlType="submit" type="primary">Book</Button>
      </Form.Item>
    </Form>
  );
};
OneWay.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default OneWay;
