import * as actionTypes from "./actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocations = (locations) => ({
  type: actionTypes.SET_LOCATIONS,
  locations,
});

export const setForecast = (forecast) => ({
  type: actionTypes.SET_FORECAST,
  forecast,
});

export const getForecast = (location) => {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem("forecast");
    if (value) {
      const storageForecastArray = JSON.parse(value).data;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely&units=metric&appid=5b0815041cbc828c8ef3a2523c4b2eb3`
      );

      const data = await response.json();

      const responseObj = {
        ...data,
        city: location.city,
        countryCode: location.countryCode,
      };

      const modForecast = { data: [responseObj, ...storageForecastArray] };

      AsyncStorage.setItem("forecast", JSON.stringify(modForecast));
      dispatch({
        type: actionTypes.GET_FORECAST,
        forecast: modForecast.data,
      });
    } else {
      const newResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely&units=metric&appid=5b0815041cbc828c8ef3a2523c4b2eb3`
      );

      const newData = await newResponse.json();
      const newStorageForecast = {
        data: [
          {
            ...newData,
            city: location.city,
            countryCode: location.countryCode,
          },
        ],
      };
      AsyncStorage.setItem("forecast", JSON.stringify(newStorageForecast));
      dispatch({
        type: actionTypes.GET_FORECAST,
        forecast: newStorageForecast.data,
      });
    }
  };
};
