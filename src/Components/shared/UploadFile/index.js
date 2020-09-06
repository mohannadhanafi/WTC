import React from 'react';
import { Upload } from 'antd';
import { Storage } from 'aws-amplify';
import PropTypes from 'prop-types';

const UploadFile = ({
  limit, className, text, name, children, ...restProps
}) => {
  const uploadFile = async (objectData) => {
    const { file, onError, onSuccess } = objectData;

    try {
      const res = await Storage.put(file?.name, file);
      onSuccess(res.key);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Upload
      className={className}
      customRequest={uploadFile}
      name={name}
      {...restProps}
    >
      {children}
    </Upload>
  );
};

UploadFile.propTypes = {
  limit: PropTypes.number,
  className: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
};

UploadFile.defaultProps = {
  className: '',
  limit: null,
  text: 'Upload',
  ...Upload.defaultProps,
};

export default UploadFile;
