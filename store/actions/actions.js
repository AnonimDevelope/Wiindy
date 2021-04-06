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

      const foundItem = storageForecastArray.find(
        (item) => item.city === location.city
      );
      if (foundItem) {
        const index = storageForecastArray.indexOf(foundItem);
        storageForecastArray.splice(index, 1);
      }

      const responseObj = {
        ...data,
        city: location.city,
        countryCode: location.countryCode,
      };

      const modForecast = { data: [responseObj, ...storageForecastArray] };

      AsyncStorage.setItem("forecast", JSON.stringify(modForecast));
      dispatch(setForecast(modForecast.data));
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
      dispatch(setForecast(newStorageForecast.data));
    }
  };
};

const getTimeDiff = (forecastTime) => {
  const currentTime = new Date().getTime();
  const elementTime = new Date(forecastTime * 1000).getTime();
  const diffTime = Math.abs(currentTime - elementTime);
  return (diffTime / 1000 / 60).toFixed(2);
};

export const checkForecast = (forecastArr, instant) => {
  return async (dispatch) => {
    const newForecast = [...forecastArr];
    let hasChanged = false;
    for (let index = 0; index < newForecast.length; index++) {
      const element = newForecast[index];
      const timeDiff = getTimeDiff(element.current.dt);
      if (timeDiff > 100 || instant === true) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${element.lat}&lon=${element.lon}&exclude=minutely&units=metric&appid=5b0815041cbc828c8ef3a2523c4b2eb3`
        );
        const data = await response.json();
        newForecast[index] = {
          ...data,
          city: element.city,
          countryCode: element.countryCode,
        };
        hasChanged = true;
      }
    }
    if (hasChanged) {
      dispatch(setForecast(newForecast));
      await AsyncStorage.setItem(
        "forecast",
        JSON.stringify({ data: newForecast })
      );
    }
  };
};

export const deleteLocation = (city, locations, forecasts) => {
  return async (dispatch) => {
    locations.splice(
      locations.indexOf(locations.find((item) => item.city === city)),
      1
    );
    forecasts.splice(
      forecasts.indexOf(forecasts.find((item) => item.city === city)),
      1
    );

    dispatch(setLocations(locations));
    dispatch(setForecast(forecasts));

    await AsyncStorage.setItem("forecast", JSON.stringify({ data: forecasts }));
    await AsyncStorage.setItem(
      "locations",
      JSON.stringify({ data: locations })
    );
  };
};
