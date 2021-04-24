import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  InteractionManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecast } from "../store/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";

import ForecastMain from "../components/Forecast/ForecastMain";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import Forecast from "../components/Forecast/Forecast";
import colors from "../constants/colors";
import IconButton from "../components/UI/IconButton";

const getSpeedUnit = (isImperial) => (isImperial ? " mph" : " m/s");

const ForecastScreen = ({ route, navigation }) => {
  const { location } = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const dispatch = useDispatch();

  const forecasts = useSelector((state) => state.forecast);
  const settings = useSelector((state) => state.settings);
  const forecast = forecasts.find((item) => item.city === location.city);

  let isDark = settings.darkMode;
  const isImperial = settings.units === "imperial";

  const deleteNotifLocation = async () => {
    const notifLocations = await AsyncStorage.getItem("notifLocations");
    const notifLocationsArr = JSON.parse(notifLocations).data;
    notifLocationsArr.splice(
      notifLocationsArr.indexOf(
        notifLocationsArr.find((item) => item.city === location.city)
      ),
      1
    );
    AsyncStorage.setItem(
      "notifLocations",
      JSON.stringify({ data: notifLocationsArr })
    );
    setIsNotifEnabled(false);
  };

  const addNotifLocation = async () => {
    const notifLocations = await AsyncStorage.getItem("notifLocations");
    if (notifLocations !== null) {
      const notifLocationsArr = JSON.parse(notifLocations).data;
      AsyncStorage.setItem(
        "notifLocations",
        JSON.stringify({
          data: [...notifLocationsArr, location],
        })
      );
    } else {
      AsyncStorage.setItem(
        "notifLocations",
        JSON.stringify({ data: [location] })
      );
    }
    setIsNotifEnabled(true);
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsAnimationDone(true);
    });
  }, []);

  useEffect(() => {
    const isNotifEnabledCheck = async () => {
      const notifLocations = await AsyncStorage.getItem("notifLocations");
      if (notifLocations !== null) {
        const notifLocationsArr = JSON.parse(notifLocations).data;
        const exists = notifLocationsArr.find(
          (item) => item.city === location.city
        );
        if (exists) {
          setIsNotifEnabled(true);
        }
      }
    };
    isNotifEnabledCheck();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [forecasts]);

  let Area = SafeAreaView;

  if (settings.simpleAnimations) {
    Area = View;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t("forecast.title"),
      headerRight: () =>
        isNotifEnabled ? (
          <IconButton
            color={isDark ? colors.whiteGray : colors.mainTextColor}
            name="bell"
            onPress={deleteNotifLocation}
          />
        ) : (
          <IconButton
            color={isDark ? colors.whiteGray : colors.mainTextColor}
            name="bell-outline"
            onPress={addNotifLocation}
          />
        ),
    });
  }, [navigation, isNotifEnabled]);

  return (
    <ScrollView
      style={
        isDark
          ? { ...styles.screen, backgroundColor: colors.backgroundColorDark }
          : styles.screen
      }
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            setIsRefreshing(true);
            dispatch(getForecast(location));
          }}
          refreshing={isRefreshing}
        />
      }
    >
      <Area>
        {!settings.simpleAnimations && (
          <View style={styles.header}>
            <IconButton
              name="keyboard-backspace"
              onPress={navigation.goBack}
              color={isDark ? colors.whiteGray : colors.mainTextColor}
            />
            {isNotifEnabled ? (
              <IconButton
                name="bell"
                onPress={deleteNotifLocation}
                color={isDark ? colors.whiteGray : colors.mainTextColor}
              />
            ) : (
              <IconButton
                name="bell-outline"
                onPress={addNotifLocation}
                color={isDark ? colors.whiteGray : colors.mainTextColor}
              />
            )}
          </View>
        )}
        <ForecastMain
          temperature={forecast.current.temp}
          status={forecast.current.weather[0].description}
          countryCode={forecast.countryCode}
          city={forecast.city}
          iconId={forecast.current.weather[0].icon}
          id={forecast.current.weather[0].id}
          isDark={isDark}
          isImperial={isImperial}
        />
        <View
          style={settings.simpleAnimations ? styles.moreNative : styles.more}
        >
          <Text style={isDark ? styles.headingDark : styles.heading}>
            {i18n.t("forecast.daily")}
          </Text>
          <Forecast
            daily
            forecast={forecast.daily}
            navigation={navigation}
            isDark={isDark}
            isImperial={isImperial}
          />
          <Text style={isDark ? styles.headingDark : styles.heading}>
            {i18n.t("forecast.hourly")}
          </Text>
          {isAnimationDone && (
            <Forecast
              forecast={forecast.hourly}
              navigation={navigation}
              isDark={isDark}
              isImperial={isImperial}
            />
          )}
          <Text style={isDark ? styles.headingDark : styles.heading}>
            {i18n.t("forecast.details")}
          </Text>
          {isAnimationDone && (
            <ForecastDetails
              centerIconName="weather-windy"
              centerLabel={
                i18n.t("forecast.windSpeed") + getSpeedUnit(isImperial)
              }
              centerValue={
                isImperial
                  ? (forecast.current.wind_speed * 2.23694).toFixed(2)
                  : forecast.current.wind_speed
              }
              leftIconName="cloud-outline"
              leftLabel={i18n.t("forecast.cloudiness") + " %"}
              leftValue={forecast.current.clouds}
              rightLabel={i18n.t("forecast.humidity") + " %"}
              rightIconName="water-percent"
              rightValue={forecast.current.humidity}
              isDark={isDark}
              isImperial={isImperial}
            />
          )}
        </View>
      </Area>
    </ScrollView>
  );
};

let margin = Dimensions.get("window").height - 720;
if (margin < 0) {
  margin = 10;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  more: {
    marginTop: margin,
    paddingHorizontal: 15,
  },
  moreNative: {
    marginTop: margin - 10,
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.mainTextColor,
    fontFamily: "lexend-semi-bold",
    fontSize: 20,
  },
  headingDark: {
    color: "#c9c9c9",
    fontFamily: "lexend-semi-bold",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default ForecastScreen;
