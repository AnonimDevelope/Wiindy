import * as actionTypes from "../actions/actionTypes";

const initialState = {
  forecast: [],
  locations: [],
};

const addLocation = (state, location) => {
  const newState = { ...state, locations: [location, ...state.locations] };
  const item = state.locations.find((item) => item.id === location.id);
  if (item) {
    const index = newState.locations.indexOf(item);
    newState.locations.splice(index, 1);
  }
  return newState;
};

const addForecast = (state, forecast) => {
  const newState = { ...state, forecast: [forecast, ...state.forecast] };
  const item = state.forecast.find((item) => item.city === forecast.city);
  if (item) {
    const index = newState.forecast.indexOf(item);
    newState.forecast.splice(index, 1);
  }

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCATION:
      return addLocation(state, action.location);
    case actionTypes.ADD_FORECAST:
      return addForecast(state, action.forecast);

    default:
      return state;
  }
};
