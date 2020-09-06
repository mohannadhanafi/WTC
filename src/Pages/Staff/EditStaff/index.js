import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import Form from '../../../Components/shared/Form';
import getFields from '../fields';
import asyncHandler from '../../../utils/asyncHandler';
import { API } from '../../../constants';

import './index.scss';

const EditStaff = () => {
  const { userData: { userType } } = useSelector((state) => state.userData);
  const { fields, initialValues } = getFields(userType);
  const { id, type } = useParams();
  const [initial, setData] = useState(initialValues);
  const [disable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStaffData = async () => {
    const result = await axios(`${API}/${type === 'driver' ? 'drivers' : 'staffProfessions'}/${id}`);
    const { data: { data } } = result;
    const newData = {
      ...data,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      phoneNumber: data.user.phoneNumber,
      email: data.user.email,
      cityId: data.city ? (data.city.id).toString() : null,
      countryId: data.country ? (data.country.id).toString() : null,
      dailyTimeWorkId: data.dailyTimeWork ? (data.dailyTimeWork.id).toString() : null,
      driverAvailabilityId: (data.driverAvailability.name),
      typeofstaffId: (data.typeofstaff.name),
      idNoTypeId: data.idNoType ? (data.idNoType.id).toString() : null,
      languageId: data.language ? (data.language.id).toString() : null,
      locationId: data.location ? (data.location.id).toString() : null,
      nationalityId: data.nationality ? (data.nationality.id).toString() : null,
      unavailabilityReasonId: data.unavailabilityReason ? (data.unavailabilityReason.id).toString() : null,
      shiftTypeId: data.shiftType ? (data.shiftType.id).toString() : null,
      userId: data.user ? (data.user.id).toString() : null,
      medicalInsuranceCompanyId: data.medicalInsuranceCompany ? (data.medicalInsuranceCompany.id).toString() : null,
      birthdayDate: data.birthdayDate && moment(data.birthdayDate),
      effectiveDate: data.effectiveDate && moment(data.effectiveDate),
      idNoExpiryDate: data.idNoExpiryDate && moment(data.idNoExpiryDate),
      licensesExpire: data.licensesExpire && moment(data.licensesExpire),
      medicalInsuranceExpiryDate: data.medicalInsuranceExpiryDate && moment(data.medicalInsuranceExpiryDate),
      staffTypeId: type === 'driver' ? '6' : data.staffTypeId,
    };
    setData(newData);
    setIsLoading(false);
  };

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      driverAvailabilityId: initial.driverAvailability ? (initial.driverAvailability.id).toString() : null,
      typeofstaffId: initial.typeofstaff ? (initial.typeofstaff.id).toString() : null,
      age: Number(((values.age).split(' '))[0]),
      licensesStatus: values.licensesStatus ? (values.licensesStatus === 'valid' ? true : values.licensesStatus === 'expired' ? false : null) : null,
      licenseTypeId: values.licenseTypeId ? (values.licenseTypeId).toString() : null,
    };
    if (type === 'driver') {
      delete newValues.staffTypeId;
      await axios.put(`${API}/drivers/${id}`, newValues);
      window.location.reload();
    } else {
      delete newValues.licensesStatus;
      delete newValues.licenseTypeId;
      await axios.put(`${API}/staffProfessions/${id}`, newValues);
      window.location.reload();
    }
  };

  const enableEdit = () => {
    setEnable(!disable);
  };

  useEffect(() => {
    asyncHandler(fetchStaffData, 'getDataOneStaff');
  }, []);
  const newFields = fields.filter((element) => element.name !== 'password' && element.name !== 'staffTypeId');


  return (
    isLoading ? <Spin spinning />
      : (
        <>
          <div className="edit-header">
            <Button
              onClick={enableEdit}
              size="large"
              type={disable ? 'primary' : 'danger'}
              className="edit-header__button"
            >
              {disable ? 'Edit' : 'Cancel'}
            </Button>
          </div>
          <Form
            fields={newFields}
            onSubmit={onSubmit}
            formName="edit-staff"
            initialValues={initial}
            disabled={disable}
          />
        </>
      )
  );
};

export default EditStaff;
