import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IconButton from "../components/UI/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ForecastScreen from "../screens/ForecastScreen";
import LocationsScreen from "../screens/LocationsScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";
import GpsLocationScreen from "../screens/GpsLocationsScreen";
import colors from "../constants/colors";

const defaultStackOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 25,
    fontFamily: "lexend-semi-bold",
    color: "#8C8C8C",
  },
};

const LocationsTabs = createMaterialTopTabNavigator();
const LocationTabsScreen = () => (
  <LocationsTabs.Navigator
    initialRouteName="My Cities"
    tabBarPosition="bottom"
    tabBarOptions={{
      showIcon: true,
      showLabel: false,
      indicatorStyle: { top: 0 },
    }}
  >
    <ForecastStack.Screen
      name="Near Me"
      component={GpsLocationScreen}
      options={{
        tabBarLabel: "Near Me",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Icon
              name="map-marker-plus"
              size={25}
              color={colors.mainTextColor}
            />
          ) : (
            <Icon
              name="map-marker-plus-outline"
              size={25}
              color={colors.mainTextColor}
            />
          ),
      }}
    />
    <ForecastStack.Screen
      name="My Cities"
      component={LocationsScreen}
      options={{
        tabBarLabel: "Near Me",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Icon name="star" size={25} color={colors.mainTextColor} />
          ) : (
            <Icon name="star-outline" size={25} color={colors.mainTextColor} />
          ),
      }}
    />
    <LocationsTabs.Screen
      name="Search City"
      component={SearchLocationScreen}
      options={{
        tabBarLabel: "Near Me",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Icon name="magnify-plus" size={25} color={colors.mainTextColor} />
          ) : (
            <Icon
              name="magnify-plus-outline"
              size={25}
              color={colors.mainTextColor}
            />
          ),
      }}
    />
  </LocationsTabs.Navigator>
);

const ForecastStack = createStackNavigator();
const ForecastStackScreen = () => (
  <ForecastStack.Navigator screenOptions={defaultStackOptions}>
    <ForecastStack.Screen
      name="Weatherio"
      component={LocationTabsScreen}
      options={{
        headerRight: () => (
          <IconButton
            name="dots-vertical"
            size={25}
            color={colors.mainTextColor}
            style={{ marginRight: 15 }}
          />
        ),
      }}
    />
    <ForecastStack.Screen
      name="Forecast"
      component={ForecastScreen}
      options={{ title: "Weather" }}
    />
  </ForecastStack.Navigator>
);

export default ForecastStackScreen;
