import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
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
  // cardStyle: { backgroundColor: "#000000", opacity: 1 },
};

const LocationsTabs = createMaterialTopTabNavigator();
const LocationTabsScreen = ({ isDark }) => (
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
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
          ) : (
            <Icon
              name="map-marker-plus-outline"
              size={25}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
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
            <Icon
              name="star"
              size={25}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
          ) : (
            <Icon
              name="star-outline"
              size={25}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
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
            <Icon
              name="magnify-plus"
              size={25}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
          ) : (
            <Icon
              name="magnify-plus-outline"
              size={25}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
          ),
      }}
    />
  </LocationsTabs.Navigator>
);

const NativeForecastStack = createNativeStackNavigator();
export const NativeForecastScreen = ({ isDark }) => (
  <NativeForecastStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerTintColor: isDark ? colors.whiteGray : colors.mainTextColor,
      // stackAnimation: isDark ? "fade" : "default",
    }}
  >
    <NativeForecastStack.Screen
      name="Wiindy"
      options={({ navigation }) => ({
        headerRight: () => (
          <Menu onPressSettings={() => navigation.navigate("Settings")} />
        ),
      })}
    >
      {(props) => <LocationTabsScreen {...props} isDark={isDark} />}
    </NativeForecastStack.Screen>
    <NativeForecastStack.Screen
      name="Forecast"
      component={ForecastScreen}
      //options={{ headerShown: false }}
    />
    <NativeForecastStack.Screen name="Settings" component={SettingsScreen} />
    <NativeForecastStack.Screen
      name="Details"
      component={ForecastDetailsScreen}
    />
  </NativeForecastStack.Navigator>
);

const ForecastStack = createStackNavigator();
const ForecastStackScreen = ({ isDark }) => (
  <ForecastStack.Navigator screenOptions={defaultStackOptions}>
    <ForecastStack.Screen
      name="Wiindy"
      options={({ navigation }) => ({
        headerRight: () => (
          <Menu onPressSettings={() => navigation.navigate("Settings")} />
        ),
      })}
    >
      {(props) => <LocationTabsScreen {...props} isDark={isDark} />}
    </ForecastStack.Screen>
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
