import React, { useEffect, useState } from 'react';
import querystring from 'querystring';
import Axios from 'axios';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { API } from '../../../../../../constants';
import asyncHandler from '../../../../../../utils/asyncHandler';

const Payment = () => {
  const { location: { pathname, search } } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const qs = querystring.parse(search.substr(1));

  const renderCheckoutForm = (data) => {
    const script = document.createElement('script');
    const wrapperElm = document.getElementById('payment');
    const newSearch = {
      ...qs,
      stepNo: 3,
    };
    const actionLink = `${window.location.origin + pathname}?${querystring.stringify(newSearch)}`;

    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${data.id}`;
    script.async = true;

    document.body.appendChild(script);

    const form = document.createElement('form');
    form.action = actionLink;
    form.setAttribute('class', 'paymentWidgets');
    form.setAttribute('data-brands', 'VISA MASTER AMEX');
    wrapperElm.appendChild(form);
  };

  useEffect(() => {
    const getCheckoutData = async () => {
      // const data = await (await Axios.post(`${API}/checkout`)).data;
      setIsLoading(false);
      // renderCheckoutForm(data);
    };

    asyncHandler(getCheckoutData, 'getCheckoutData');
  }, []);


  if (isLoading) {
    return <Spin spinning size="large" />;
  }

  return (
    <div id="payment" />
  );
};

export default Payment;
