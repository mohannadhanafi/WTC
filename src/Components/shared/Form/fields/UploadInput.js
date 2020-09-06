import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import isEqual from 'react-fast-compare';
import { UploadOutlined } from '@ant-design/icons';
import UploadFile from '../../UploadFile';

const getFileValue = (file) => file?.file?.name;

const UploadField = (props) => {
  const {
    name,
    rules,
    label,
  } = props;
  return (
    <Form.Item
      name={name}
      valuePropName="value"
      getValueFromEvent={getFileValue}
      rules={rules}
    >
      <UploadFile name={name}>
        <Button>
          <UploadOutlined />
          {' '}
          {label}
        </Button>
      </UploadFile>
    </Form.Item>
  );
};

UploadField.propTypes = {
  name: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string.isRequired,
};

UploadField.defaultProps = {
  rules: [],
};

const UploadInput = memo(UploadField, isEqual);

export default UploadInput;
