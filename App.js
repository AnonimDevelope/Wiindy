import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import reducer from "./store/reducers/reducer";
import { enableScreens } from "react-native-screens";
enableScreens();
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./navigation/navigator";
import { setLocations, setForecast } from "./store/actions/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default function App() {
  let [fontsLoaded] = useFonts({
    "lexend-light": require("./assets/fonts/Lexend-Light.ttf"),
    "lexend-regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "lexend-semi-bold": require("./assets/fonts/Lexend-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ReduxAccess>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ReduxAccess>
    </Provider>
  );
}

const ReduxAccess = ({ children }) => {
  //  Used for accessing redux store in root component

  const dispatch = useDispatch();

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
        dispatch(setForecast(JSON.parse(forecasts).data));
      }
    };
    getLocations();
    getForecasts();
  }, []);

  return children;
};
