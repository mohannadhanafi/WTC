import React, { useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import './index.scss';

const VerifyCode = () => {
  const { location: { search }, push } = useHistory();
  const username = new URLSearchParams(search).get('username');
  const [isLoading, setIsLoading] = useState(false);

  const onFinsh = async ({ code }) => {
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      notification.success({ message: 'Thanks for registration, we will evaluate your account then we will email you', duration: 4 });
      push('/login');
      setIsLoading(false);
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
      setIsLoading(false);
    }
  };

  return (
    <div className="verify-code">
      <div className="auth-form-container">
        <h2 className="form-header">
          Verify Code
        </h2>
        <Form
          initialValues={{ code: '' }}
          onFinish={onFinsh}
          className="auth-form"
        >
          <Form.Item name="code">
            <Input placeholder="code" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              className="auth-form__submit"
              type="primary"
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyCode;
