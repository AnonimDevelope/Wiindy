import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ForecastScreen from "../screens/ForecastScreen";
import LocationsScreen from "../screens/LocationsScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";
import GpsLocationScreen from "../screens/GpsLocationsScreen";
import ForecastDetailsScreen from "../screens/ForecastDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import colors from "../constants/colors";
import Menu from "../components/Navigation/Menu";

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
    backBehavior="initialRoute"
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
        //tabBarLabel: "Near Me",
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
        //tabBarLabel: "Near Me",
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
        //tabBarLabel: "Near Me",
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
      options={({ navigation }) => ({
        headerRight: () => (
          <Menu onPressSettings={() => navigation.navigate("Settings")} />
        ),
      })}
    />
    <ForecastStack.Screen
      name="Forecast"
      component={ForecastScreen}
      options={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    />
    <ForecastStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        ...TransitionPresets.DefaultTransition,
      }}
    />
    <ForecastStack.Screen
      name="Details"
      component={ForecastDetailsScreen}
      options={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        detachPreviousScreen: false,
        gestureEnabled: true,
        gestureDirection: "vertical",
      }}
    />
  </ForecastStack.Navigator>
);

export default ForecastStackScreen;
