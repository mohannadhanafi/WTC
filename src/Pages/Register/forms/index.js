import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../Components/shared/Form';
import { fields as supplierFields, initialValues as supplierValues } from './fields/supplierFields';
import { fields as corporateHotelFields, initialValues as corporateHotelValues } from './fields/corporateHotelFields';

const formData = {
  supplier: {
    fields: supplierFields,
    initialValues: supplierValues,
  },
  hotel: {
    fields: corporateHotelFields,
    initialValues: corporateHotelValues,
  },
  corporate: {
    fields: corporateHotelFields,
    initialValues: corporateHotelValues,
  },
};

const SignUpForms = ({ onSubmit, accountType }) => (
  <Form
    onSubmit={onSubmit}
    formName="registrationss"
    {...formData[accountType]}
    buttonText="Sign Up"
  />
);

SignUpForms.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
};

export default SignUpForms;
