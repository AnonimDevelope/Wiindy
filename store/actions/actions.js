import * as actionTypes from "./actionTypes";

export const addLocation = (location) => {
  return {
    type: actionTypes.ADD_LOCATION,
    location,
  };
};

export const addForecast = (location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely&units=metric&appid=5b0815041cbc828c8ef3a2523c4b2eb3`
    );

    const data = await response.json();
    dispatch({
      type: actionTypes.ADD_FORECAST,
      forecast: {
        ...data,
        city: location.city,
        countryCode: location.countryCode,
      },
    });
  };
};
