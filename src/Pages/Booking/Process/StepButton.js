import React from 'react';
import PropTypes from 'prop-types';

const StepButton = (props) => {
  const {
    setStep,
    stepNo,
    currentStep,
    stepText,
  } = props;

  return (
    <button
      data-step={stepNo}
      type="button"
      className={`booking-process__step${stepNo === currentStep ? ' booking-process__step--active' : ''}`}
      onClick={setStep}
    >
      {stepText}
    </button>
  );
};

StepButton.propTypes = {
  setStep: PropTypes.func.isRequired,
  stepNo: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  stepText: PropTypes.string.isRequired,
};

export default StepButton;
