import React from 'react';
import {
  Input, Form, Button, DatePicker,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import GooglePlacesInput from '../../../Components/shared/GooglePlacesInput';

const format = 'hh:mm A';

const ByHour = ({ onSearch }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="by-hour"
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
      <Form.Item name="duration" rules={[{ required: true, message: 'Please enter the duration.' }]}>
        <Input placeholder="Duration" />
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

ByHour.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default ByHour;
