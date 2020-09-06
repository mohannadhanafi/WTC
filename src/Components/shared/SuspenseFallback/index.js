import React from 'react';
import { Spin } from 'antd';

import './index.scss';

const SuspenseFallback = () => (
  <div className="fallback">
    <Spin spinning />
  </div>
);

export default SuspenseFallback;
