import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import PropTypes from 'prop-types';
import {
  Form, Button, Space,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FloatLabel from '../FloatLabel';
import DropDown from '../../DropDown';

const InputLanguageField = (props) => {
  const {
    placeholder,
    name,
    value,
    rules,
  } = props;
  return (
    <FloatLabel label={placeholder} value={value}>
      <Form.Item
        name={name}
        rules={rules}
      >
        <Form.List name="language">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'languageId']}
                    fieldKey={[field.fieldKey, 'languageId']}
                    rules={[{ required: true, message: 'The language is required' }]}
                  >
                    <DropDown items={[]} getURL="/languages" placeholder="Language" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'level']}
                    fieldKey={[field.fieldKey, 'level']}
                    rules={[{ required: true, message: 'The level is required' }]}
                  >
                    <DropDown items={['native', 'fluent', 'intermediate', 'basic']} placeholder="Level" />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined />
                  {' '}
                  Add language
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form.Item>
    </FloatLabel>
  );
};

InputLanguageField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

InputLanguageField.defaultProps = {
  placeholder: '',
  value: undefined,
};

const InputLanguage = memo(InputLanguageField, isEqual);

export default InputLanguage;
