import React, { useState } from 'react';
import {
  Form, Button, Select, DatePicker,
} from 'antd';
import Modal from '../Modal';

export default function RideSettings({ visible, handleCancel }) {
  const { Option } = Select;
  const format = 'hh:mm A';
  const [initialValues, setInitialValues] = useState();
  const onFinish = (values) => console.log('test ', values);
  return (
    <Modal
      visible={visible}
      title="Ride Settings"
    >
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item name="incident">
          <Select placeholder="Incident Type">
            <Option value="1">WTC payment model not followed</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date">
          <DatePicker format="ddd ,MMM DD, YYYY" />
        </Form.Item>
        <Form.Item name="time">
          <DatePicker.TimePicker format={format} use12Hours showSecond={false} />
        </Form.Item>
        <div className="modal-footer">
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>
          <Form.Item onFinish={onFinish} style={{ display: 'inline-block', marginLeft: 15 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
