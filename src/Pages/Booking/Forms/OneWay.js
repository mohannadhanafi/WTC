import React from 'react';
import {
  Form, Button, DatePicker,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import GooglePlacesInput from '../../../Components/shared/GooglePlacesInput';

const format = 'hh:mm A';

const OneWay = ({ onSearch }) => {
  const [form] = Form.useForm();

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
        />
      </Form.Item>
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
