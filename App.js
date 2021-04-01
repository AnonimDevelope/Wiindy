import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
enableScreens();
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./navigation/navigator";

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
    <NavigationContainer>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </NavigationContainer>
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
