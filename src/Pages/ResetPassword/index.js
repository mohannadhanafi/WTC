import React, { useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import './index.scss';

const ResetPassword = () => {
  const { location: { search }, push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const username = new URLSearchParams(search).get('username');

  const onFinsh = async ({ verificationCode, password }) => {
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username, verificationCode, password);
      push('/login');
      setIsLoading(false);
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <div className="auth-form-container">
        <Form
          initialValues={{ username: '' }}
          onFinish={onFinsh}
          className="auth-form"
        >
          <Form.Item name="verificationCode" rules={[{ required: true, message: 'Confirmation code cannot be empty!' }]}>
            <Input placeholder="Enter your verification code" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Password cannot be empty!' }]}>
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              className="auth-form__submit"
              type="primary"
              htmlType="submit"
            >
              Confirm password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
