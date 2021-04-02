import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import IconButton from "../components/UI/IconButton";

import ForecastScreen from "../screens/ForecastScreen";
import LocationsScreen from "../screens/LocationsScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";

const defaultStackOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 25,
    fontFamily: "lexend-semi-bold",
    color: "#8C8C8C",
  },
};

const ForecastStack = createStackNavigator();
const ForecastStackScreen = () => (
  <ForecastStack.Navigator screenOptions={defaultStackOptions}>
    <ForecastStack.Screen
      name="Locations"
      options={({ navigation }) => ({
        title: "My Locations",
        headerRight: () => (
          <IconButton
            name="magnify"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Search Location")}
          />
        ),
      })}
      component={LocationsScreen}
    />
    <ForecastStack.Screen
      name="Forecast"
      component={ForecastScreen}
      options={{ title: "Weather" }}
    />
    <ForecastStack.Screen
      name="Search Location"
      component={SearchLocationScreen}
      options={{
        ...TransitionPresets.DefaultTransition,
        headerTitleAlign: "left",
      }}
    />
  </ForecastStack.Navigator>
);

export default ForecastStackScreen;
