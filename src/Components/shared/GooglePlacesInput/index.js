import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PropTypes from 'prop-types';

import './index.scss';

const GooglePlacesInput = ({
  setFieldsValue, name, placeholder, getAirPortValue,
}) => {
  const handlePlaceSelect = (place) => {
    if (place.description.includes('Airport')) {
      if (getAirPortValue) getAirPortValue(true);
      return setFieldsValue({ [name]: { name: place.place_id, airport: true } });
    }
    if (getAirPortValue) getAirPortValue(false);
    return setFieldsValue({ [name]: place.place_id });
  };

  return (
    <GooglePlacesAutocomplete
      onSelect={handlePlaceSelect}
      loader={<div>Loading ...</div>}
      placeholder={placeholder}
    />
  );
};

GooglePlacesInput.propTypes = {
  setFieldsValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default GooglePlacesInput;
