import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import colors from "../constants/colors";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import { ScrollView } from "react-native-gesture-handler";
import i18n from "i18n-js";

const getSpeedUnit = (isImperial) => (isImperial ? " mph" : " m/s");
const getTempUnit = (isImperial) => (isImperial ? " °F" : " °c");

const ForecastDetailsScreen = ({ route, navigation }) => {
  const forecast = route.params.data;
  const isDaily = route.params.daily;
  const isDark = useSelector((state) => state.settings.darkMode);
  const isImperial =
    useSelector((state) => state.settings.units) === "imperial";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t("details.title"),
    });
  }, [navigation]);

  if (isDaily) {
    const sunsetDate = new Date(forecast.sunset * 1000);
    const sunset = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`;

    const sunriseDate = new Date(forecast.sunrise * 1000);
    const sunrise = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`;

    const date = new Date(forecast.dt * 1000);
    let month = date.getMonth();
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const transformedDate = `${day}.${month}.${date.getFullYear()}`;

    return (
      <ScrollView style={isDark ? styles.screenDark : styles.screen}>
        <Text
          style={
            isDark ? { ...styles.title, color: colors.whiteGray } : styles.title
          }
        >
          {transformedDate}
        </Text>
        <ForecastDetails
          leftIconName="thermometer"
          leftLabel={i18n.t("details.temperatureDay") + getTempUnit(isImperial)}
          leftValue={
            isImperial
              ? (forecast.temp.day * 1.8 + 32).toFixed(2)
              : forecast.temp.day
          }
          centerIconName="weather-night"
          centerLabel={
            i18n.t("details.temperatureNight") + getTempUnit(isImperial)
          }
          centerValue={
            isImperial
              ? (forecast.temp.night * 1.8 + 32).toFixed(2)
              : forecast.temp.night
          }
          rightLabel={i18n.t("details.feelsLikeDay") + getTempUnit(isImperial)}
          rightIconName="white-balance-sunny"
          rightValue={
            isImperial
              ? (forecast.feels_like.day * 1.8 + 32).toFixed(2)
              : forecast.feels_like.day
          }
          isDark={isDark}
        />
        <ForecastDetails
          leftIconName="weather-windy"
          leftLabel={i18n.t("forecast.windSpeed") + getSpeedUnit(isImperial)}
          leftValue={
            isImperial
              ? (forecast.wind_speed * 2.23694).toFixed(2)
              : forecast.wind_speed
          }
          centerIconName="cloud-outline"
          centerLabel={i18n.t("forecast.cloudiness") + " %"}
          centerValue={forecast.clouds}
          rightLabel={i18n.t("forecast.humidity") + " %"}
          rightIconName="water-percent"
          rightValue={forecast.humidity}
          isDark={isDark}
        />
        <ForecastDetails
          leftIconName="weather-sunset-up"
          leftLabel={i18n.t("details.sunrise")}
          leftValue={sunrise}
          centerIconName="arrow-collapse-down"
          centerLabel={i18n.t("details.pressure") + " hPa"}
          centerValue={forecast.clouds}
          rightLabel={i18n.t("details.sunset")}
          rightIconName="weather-sunset-down"
          rightValue={sunset}
          isDark={isDark}
        />
        <View style={styles.textContainer}>
          <Text
            style={
              isDark
                ? { ...styles.labelText, color: colors.whiteGray }
                : styles.labelText
            }
          >
            {i18n.t("details.description")}
          </Text>
          <Text
            style={
              isDark ? { ...styles.text, color: colors.whiteGray } : styles.text
            }
          >
            {forecast.weather[0].description}
          </Text>
        </View>
      </ScrollView>
    );
  }

  const date = new Date(forecast.dt * 1000);
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const transformedDate = `${day}.${month}.${date.getFullYear()} ${date.getHours()}:${minutes}`;

  return (
    <View style={isDark ? styles.screenDark : styles.screen}>
      <Text
        style={
          isDark ? { ...styles.title, color: colors.whiteGray } : styles.title
        }
      >
        {transformedDate}
      </Text>
      <ForecastDetails
        leftIconName="white-balance-sunny"
        leftLabel={i18n.t("details.temperature") + getTempUnit(isImperial)}
        leftValue={
          isImperial ? (forecast.temp * 1.8 + 32).toFixed(2) : forecast.temp
        }
        centerIconName="arrow-collapse-down"
        centerLabel={i18n.t("details.pressure") + " hPa"}
        centerValue={forecast.pressure}
        rightLabel={i18n.t("details.feelsLike") + getTempUnit(isImperial)}
        rightIconName="thermometer"
        rightValue={
          isImperial
            ? (forecast.feels_like * 1.8 + 32).toFixed(2)
            : forecast.feels_like
        }
        isDark={isDark}
      />
      <ForecastDetails
        leftIconName="weather-windy"
        leftLabel={i18n.t("forecast.windSpeed") + getSpeedUnit(isImperial)}
        leftValue={
          isImperial
            ? (forecast.wind_speed * 2.23694).toFixed(2)
            : forecast.wind_speed
        }
        centerIconName="cloud-outline"
        centerLabel={i18n.t("forecast.cloudiness") + " %"}
        centerValue={forecast.clouds}
        rightLabel={i18n.t("forecast.humidity") + " %"}
        rightIconName="water-percent"
        rightValue={forecast.humidity}
        isDark={isDark}
      />
      <View style={styles.textContainer}>
        <Text
          style={
            isDark
              ? { ...styles.labelText, color: colors.whiteGray }
              : styles.labelText
          }
        >
          {i18n.t("details.description")}
        </Text>
        <Text
          style={
            isDark ? { ...styles.text, color: colors.whiteGray } : styles.text
          }
        >
          {forecast.weather[0].description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 15,
  },
  screenDark: {
    flex: 1,
    backgroundColor: colors.backgroundColorDark,
    paddingHorizontal: 15,
  },
  textContainer: {
    flexDirection: "row",
  },
  labelText: {
    fontFamily: "lexend-semi-bold",
    fontSize: 20,
    color: colors.mainTextColor,
  },
  text: {
    fontFamily: "lexend-regular",
    fontSize: 20,
    color: colors.mainTextColor,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
  },
});

export default ForecastDetailsScreen;
