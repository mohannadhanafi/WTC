import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, Button, notification,
} from 'antd';
import { Auth } from 'aws-amplify';

import './index.scss';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({
    username, password,
  }) => {
    setIsLoading(true);
    try {
      await Auth.signIn(username, password);
      window.location.reload();
      setIsLoading(false);
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
      setIsLoading(false);
    }
  };


  return (
    <div className="login">
      <div className="auth-form-container">
        <h3 className="form-header">LOGIN</h3>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <p className="auth-form__link">
            Forgot your password?
            {' '}
            <Link to="/forgot-password">Reset</Link>
          </p>

          <Form.Item>
            <Button
              loading={isLoading}
              className="auth-form__submit"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
          <div>
            No account?
            {' '}
            <Link to="/register">Create account</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
