import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import querystring from 'querystring';
import StepButton from './StepButton';
import ServiceClass from './Steps/ServiceClass';
import Options from './Steps/Options';
import Payment from './Steps/Payment';
import Checkout from './Steps/Checkout';

import './index.scss';


const BookingProcess = () => {
  const { push, location: { pathname, search } } = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const qs = querystring.parse(search.substr(1));

  useEffect(() => {
    const { stepNo } = qs;
    if (stepNo) {
      setCurrentStep(Number(stepNo));
    }
  }, []);

  const setStep = (e) => {
    let stepNo = null;

    if (e.target) {
      stepNo = Number(e.target?.dataset?.step);
    } else {
      stepNo = e;
    }
    // Change current step no state
    setCurrentStep(stepNo);

    // Change router query value for stepNo
    const newSearch = {
      ...qs,
      stepNo,
    };
    push({ pathname, search: querystring.stringify(newSearch) });
  };

  const steps = {
    0: <ServiceClass onClickSelect={setStep} />,
    1: <Options setStep={setStep} />,
    2: <Payment />,
    3: <Checkout />,
  };

  return (
    <div className="booking-process">
      <div className="container">
        <div className="booking-process__steps">
          <StepButton
            stepText="Service Class"
            stepNo={0}
            setStep={setStep}
            currentStep={currentStep}
          />
          <StepButton
            stepText="Options"
            stepNo={1}
            setStep={setStep}
            currentStep={currentStep}
          />
          <StepButton
            stepText="Payment"
            stepNo={2}
            setStep={setStep}
            currentStep={currentStep}
          />
          <StepButton
            stepText="Checkout"
            stepNo={3}
            setStep={setStep}
            currentStep={currentStep}
          />
        </div>
        <div className="booking-process__current-step">
          {steps[currentStep]}
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
