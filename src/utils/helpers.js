import moment from 'moment';

/**
 *
 * @param {date} current
 * @description disable the future date for date picker
 */
const disabledBirthDates = (current) => current && current > moment().endOf('day');

/**
 *
 * @param {object} obj
 * @param {{dateKeys: Array, initialValue: String}} options
 * @description convert object data to url query
 *
 * @returns URL Query
 */
const convertObjToURLQuery = (obj, options = {}) => {
  const { dateKeys, initialValue } = options;

  const searchQuery = Object.keys(obj).reduce((total, currKey) => {
    let query = total;

    if (dateKeys?.includes(currKey)) {
      if (query === '') {
        query += `${currKey}=${moment(obj[currKey]).format()}`;
      } else {
        query += `&${currKey}=${moment(obj[currKey]).format()}`;
      }
    } else if (query === '') {
      query += `${currKey}=${obj[currKey]}`;
    } else {
      query += `&${currKey}=${obj[currKey]}`;
    }

    return query;
  }, initialValue || '');

  return searchQuery;
};

export {
  disabledBirthDates,
  convertObjToURLQuery,
};
