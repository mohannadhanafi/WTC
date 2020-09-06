import moment from 'moment';

export default (fields) => {
  let copyFields = { ...fields };

  Object.keys(copyFields).forEach((key) => {
    if (typeof copyFields[key] === 'string' && Date.parse(copyFields[key]) >= 0) {
      copyFields = {
        ...copyFields,
        [key]: moment(copyFields[key]),
      };
    } else {
      copyFields = {
        ...copyFields,
        [key]: copyFields[key],
      };
    }
  });

  return copyFields;
};
