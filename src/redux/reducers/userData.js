import { SET_USER_DATA } from '../../constants';

const initialState = {
  userData: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    default:
      return state;
  }
}
