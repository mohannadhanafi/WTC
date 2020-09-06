import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, InputNumber,
} from 'antd';
import { Storage } from 'aws-amplify';
import moment from 'moment';
import {
  isTextInput, isTextareaInput,
  isNumberInput, isDatePickerInput,
  isSelectInput, isUploadInput,
  isPasswordInput,
} from './inputTypes';
import ShowFiles from './fields/ShowFiles';

const FormField = ({
  element, getFieldValue, disabled,
}) => {
  const {
    tag,
    type,
    placeholder,
    name,
    prefix,
    label,
  } = element;

  const renderField = () => {
    if (isTextInput(tag, type)) {
      return (
        getFieldValue(name) ? (
          <Form.Item
            name={name}
            label={label || placeholder}
          >
            <Input
              placeholder={placeholder}
              type={type}
              prefix={getFieldValue(name) ? prefix : null}
              disabled={disabled}
            />
          </Form.Item>
        ) : null
      );
    }

    if (isTextareaInput(tag, type)) {
      return (
        getFieldValue(name) ? (
          <Form.Item
            name={name}
            label={label || placeholder}
          >
            <span className="ant-date-disabled">{getFieldValue(name)}</span>
          </Form.Item>
        ) : null
      );
    }

    if (isNumberInput(tag, type)) {
      return (
        getFieldValue(name) ? (
          <Form.Item
            name={name}
            label={label || placeholder}
          >
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
            />
          </Form.Item>
        ) : null
      );
    }

    if (isPasswordInput(tag, type)) {
      return null;
    }

    if (isDatePickerInput(tag)) {
      return (
        getFieldValue(name) ? (
          <Form.Item
            name={name}
            label={label || placeholder}
          >
            <span className="ant-date-disabled">{moment(getFieldValue(name)).format('YYYY-MMM-DD')}</span>
          </Form.Item>
        ) : null
      );
    }

    if (isSelectInput(tag)) {
      return null;
      // (
      //   getFieldValue(name) ? (
      //     <Form.Item
      //       name={name}
      //       label={label || placeholder}
      //     >
      //       <span className="ant-select-disabled">{getFieldValue(name)}</span>
      //     </Form.Item>
      //   ) : null
      // );
    }


    // This will be change to view the images or files
    if (isUploadInput(tag)) {
      // When we get the cloudfront url we should return an image like this
      // const imageUrl = `https://cloudfrontLink/${getFieldValue(name)}`;
      // return <img src={imageUrl} alt={getFieldValue(name)} />;
      return <ShowFiles name={getFieldValue(name)} label={label} />;
    }

    return null;
  };

  return renderField();
};

FormField.propTypes = {
  element: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  getFieldValue: PropTypes.func.isRequired,

};

export default FormField;
