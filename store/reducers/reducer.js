import * as actionTypes from "../actions/actionTypes";

const initialState = {
  forecast: [],
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATIONS:
      return { ...state, locations: action.locations };
    case actionTypes.GET_FORECAST:
      return { ...state, forecast: action.forecast };
    case actionTypes.SET_FORECAST:
      return { ...state, forecast: action.forecast };

    default:
      return state;
  }
};
