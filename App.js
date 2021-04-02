import "react-native-gesture-handler";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./store/reducers/reducer";
import { StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
enableScreens();
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./navigation/navigator";

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
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
