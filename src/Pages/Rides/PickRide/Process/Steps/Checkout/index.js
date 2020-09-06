import React, { useEffect, useState } from 'react';
import querystring from 'querystring';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { API } from '../../../../../../constants';
import asyncHandler from '../../../../../../utils/asyncHandler';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState({});
  const { location: { search } } = useHistory();
  const qs = querystring.parse(search.substr(1));
  const { resourcePath } = qs;

  useEffect(() => {
    const getCheckoutData = async () => {
      // const data = await (await Axios.post(`${API}/result`, { resourcePath })).data;
      setIsLoading(false);
      // setTransactionData(data);
    };

    asyncHandler(getCheckoutData, 'getCheckoutData');
  }, []);


  if (isLoading) {
    return <Spin spinning size="large" />;
  }

  return (
    <div className="checkout">
      <h2>{transactionData?.result?.description}</h2>
    </div>
  );
};

export default Checkout;
