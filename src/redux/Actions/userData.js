/* eslint-disable import/prefer-default-export */
import { SET_USER_DATA } from '../../constants';

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});
