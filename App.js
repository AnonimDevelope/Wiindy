import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import reducer from "./store/reducers/reducer";
import { enableScreens } from "react-native-screens";
enableScreens();
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./navigation/navigator";
import AnimatedSplash from "./components/UI/Splash/AnimatedSplash";
import {
  setLocations,
  setForecast,
  checkForecast,
} from "./store/actions/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default function App() {
  const [isInitialFetchgDone, setIsInitialFetchDone] = useState(false);
  const [renderDefaultSplash, setRenderDefaultSplash] = useState(true);

  let [fontsLoaded] = useFonts({
    "lexend-light": require("./assets/fonts/Lexend-Light.ttf"),
    "lexend-regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "lexend-semi-bold": require("./assets/fonts/Lexend-SemiBold.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setRenderDefaultSplash(false);
    }, 50);
  }, []);

  if (renderDefaultSplash) {
    return <AppLoading />;
  }

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={fontsLoaded && isInitialFetchgDone}
      logoImage={require("./assets/weather-icon.png")}
      backgroundColor={"#44B8EC"}
      logoHeight={150}
      logoWidth={150}
    >
      <Provider store={store}>
        <ReduxAccess onCheckDone={() => setIsInitialFetchDone(true)}>
          {fontsLoaded && isInitialFetchgDone && (
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          )}
        </ReduxAccess>
      </Provider>
    </AnimatedSplash>
  );
}

const ReduxAccess = ({ children, onCheckDone }) => {
  //  Used for accessing redux store in root component
  const isCheckForecastDone = useSelector((state) => state.forecastChecked);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isCheckForecastDone) {
      onCheckDone();
    }
  }, [isCheckForecastDone]);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await AsyncStorage.getItem("locations");
      if (locations !== null) {
        dispatch(setLocations(JSON.parse(locations).data));
      }
    };
    const getForecasts = async () => {
      const forecasts = await AsyncStorage.getItem("forecast");
      if (forecasts !== null) {
        const forecastArray = JSON.parse(forecasts).data;
        dispatch(setForecast(forecastArray));
        dispatch(checkForecast(forecastArray));
      }
    };
    getLocations();
    getForecasts();
  }, []);

  return children;
};
