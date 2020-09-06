import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../constants';
import asyncHandler from '../../utils/asyncHandler';

import './index.scss';

const Policy = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const getPolicy = async () => {
      const data = await (await axios.get(`${API}/policy/1`)).data;
      const policy = data.data.description;
      setContent(policy);
    };

    asyncHandler(getPolicy, 'Policy - getPolicy');
  }, []);

  return (
    <div className="policy">
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Policy;
