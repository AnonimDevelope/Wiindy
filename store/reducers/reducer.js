import * as actionTypes from "../actions/actionTypes";

const initialState = {
  forecast: [],
  locations: [],
  forecastChecked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATIONS:
      return { ...state, locations: action.locations };
    case actionTypes.SET_FORECAST:
      return { ...state, forecast: action.forecast };
    case actionTypes.CHECK_DONE:
      return { ...state, forecastChecked: true };
    default:
      return state;
  }
};
