import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Modal from '../Modal';
import { convertToArray, convertToObject } from '../../../utils/paymentHelper';

import { API } from '../../../constants';
import asyncHandler from '../../../utils/asyncHandler';
import './index.scss';

export default function PaymentSettings({
  visible, handleCancel, url, typeId,
}) {
  const [initialValues, setInitialValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const onFinish = (values) => {
    setIsLoading(true);
    const array = convertToArray(values);
    const finalValues = array.map((item) => {
      item[typeId] = id;
      return item;
    });
    Axios.put(`${API}/${url}/${id}`, { Prices: finalValues });
    setIsLoading(false);
    window.location.reload();
  };

  const fetchPaymentData = async () => {
    const result = await Axios.get(`${API}/${url}/${id}`);
    const { data: { data } } = result;
    const finalData = convertToObject(data);
    setInitialValues(finalData);
  };

  useEffect(() => {
    asyncHandler(fetchPaymentData, 'getPayment');
  }, []);
  return (
    <Modal
      visible={visible}
      title="Payment Settings"
    >
      <Form onFinish={onFinish} initialValues={initialValues}>
        <div className="area-a">
          <div className="form--row form--row--header">
            <span>Area A</span>
            <span>0-30Km</span>
            <span>Above 30km</span>
            <span>Hourly (for two areas)</span>
          </div>
          <div className="form--row form--row--header">
            <span>Currency &amp; Condition</span>
            <span>USD / Fixed Price</span>
            <span>USD / Per Km</span>
            <span>USD / Per Hour</span>
          </div>
          <div className="form--row">
            <span className="left-column-cell">Business Class</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businessprice0To30Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businessprice30To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businesshourly"><Input type="number" /></Form.Item></span>
          </div>
          <div className="form--row">
            <span className="left-column-cell">Business Van</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanprice0To30Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanprice30To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanhourly"><Input type="number" /></Form.Item></span>
          </div>
          <div className="form--row">
            <span className="left-column-cell">First Class</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="firstprice0To30Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="firstprice30To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="firsthourly"><Input type="number" /></Form.Item></span>
          </div>
        </div>

        <div className="area-b">
          <div className="form--row form--row--header">
            <span>Area B</span>
            <span>0-50Km</span>
            <span>Above 50km</span>
            {/* <span>Hourly</span> */}
          </div>
          <div className="form--row form--row--header">
            <span>Currency &amp; Condition</span>
            <span>USD / Fixed Price</span>
            <span>USD / Per Km</span>
            {/* <span>USD / Per Hour</span> */}
          </div>
          <div className="form--row">
            <span className="left-column-cell">Business Class</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businessprice0To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businessabove50KmPrice"><Input type="number" /></Form.Item></span>
            {/* <span><Form.Item rules={[{ required: true, message: 'required' }]} name="businessHourlyB"><Input type="number" /></Form.Item></span> */}
          </div>
          <div className="form--row">
            <span className="left-column-cell">Business Van</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanprice0To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanabove50KmPrice"><Input type="number" /></Form.Item></span>
            {/* <span><Form.Item rules={[{ required: true, message: 'required' }]} name="vanHourlyB"><Input type="number" /></Form.Item></span> */}
          </div>
          <div className="form--row">
            <span className="left-column-cell">First Class</span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="firstprice0To50Km"><Input type="number" /></Form.Item></span>
            <span><Form.Item rules={[{ required: true, message: 'required' }]} name="firstabove50KmPrice"><Input type="number" /></Form.Item></span>
            {/* <span><Form.Item name="firstHourlyB"><Input type="number" /></Form.Item></span> */}
          </div>
        </div>
        <div className="modal-footer">
          <Button key="back" onClick={handleCancel}>
            Return
          </Button> 
          <Form.Item onFinish={onFinish} style={{ display: 'inline-block', marginLeft: 15 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
