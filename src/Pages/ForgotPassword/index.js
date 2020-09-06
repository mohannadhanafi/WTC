import React, { useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import { Auth } from 'aws-amplify';

import './index.scss';
import { Link, useHistory } from 'react-router-dom';

const ForgotPassword = () => {
  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onFinsh = async ({ username }) => {
    setIsLoading(true);
    try {
      await Auth.forgotPassword(username);
      push({
        pathname: 'reset-password',
        search: `?username=${username}`,
      });
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
          <Form.Item name="username" rules={[{ required: true, message: 'Username cannot be empty!' }]}>
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              className="auth-form__submit"
              type="primary"
              htmlType="submit"
            >
              Confirm username
            </Button>
          </Form.Item>
          <div>
            <Link to="/login">Ooh! Wait! I&lsquo;ve remembered!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
