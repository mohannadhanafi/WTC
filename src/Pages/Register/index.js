import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { notification, Select } from 'antd';
import axios from 'axios';
import SignUpForms from './forms';
import { API } from '../../constants';

import './index.scss';

const Register = () => {
  const { push } = useHistory();
  const [accountType, setAccountType] = useState('supplier');

  const onFinish = async (values, setIsLoading) => {
    setIsLoading(false);
    const {
      email, password, firstName, phoneNumber, ...restValues
    } = values;
    try {
      await axios.post(`${API}/auth/signup`, {
        firstName,
        lastName: firstName,
        email,
        password,
        phoneNumber,
        userType:
          accountType === 'supplier' ? 2
            : accountType === 'hotel' ? 3
              : accountType === 'corporate' ? 4
                : null,
        ...restValues,
      });
      push({
        pathname: '/login',
        search: `?username=${email}`,
      });
      setIsLoading(false);
    } catch (error) {
      notification.error({ message: error.response.data.message, duration: 2 });
      setIsLoading(false);
    }
  };

  const handleSelect = (val) => {
    setAccountType(val);
  };

  return (
    <div className="register align-start">
      <div className="auth-form-container large">
        <h3 className="form-header">Register</h3>
        <div className="register__account-type">
          <p className="register__account-type-label">Select Account Type</p>
          <Select value={accountType} onSelect={handleSelect} className="register__account-type-select">
            <Select.Option value="supplier">Supplier</Select.Option>
            <Select.Option value="hotel">Hotel</Select.Option>
            <Select.Option value="corporate">Corporate</Select.Option>
          </Select>
        </div>
        <SignUpForms onSubmit={onFinish} accountType={accountType} />
        <div className="register__login-link">
          Have an account?
          {' '}
          <Link
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
