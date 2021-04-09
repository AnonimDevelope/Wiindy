import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../constants/colors";
import getIcon from "../../assets/lottie/getIcon";
import Touchable from "../UI/Touchable";

const ForecastItem = ({
  temperature,
  id,
  timestamp,
  daily,
  iconId,
  onPress,
  isDark,
}) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  let day = date.getDate();
  if (day <= 9 && !daily) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = `0${month}`;
  }
  const year = date.getFullYear();

  const fullDate = `${day}.${month}.${year}`;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentWeekDay = weekDays[date.getDay()];

  const icon = getIcon(iconId, id, true);

  return (
    <React.Fragment>
      {hours === 0 && !daily && (
        <View style={styles.midnight}>
          <Text
            style={
              isDark
                ? {
                    ...styles.midnightDate,
                    color: colors.whiteGray,
                    backgroundColor: colors.cardColor,
                  }
                : styles.midnightDate
            }
          >
            {fullDate}
          </Text>
        </View>
      )}
      <Touchable useForeground onPress={onPress}>
        <View style={daily ? styles.itemDaily : styles.item}>
          <View style={styles.tempWrapper}>
            <Text
              style={
                isDark
                  ? { ...styles.temp, color: colors.whiteGray }
                  : styles.temp
              }
            >
              {temperature.toFixed(0)}
            </Text>
            <Text
              style={
                isDark
                  ? { ...styles.itemText, color: colors.whiteGray }
                  : styles.itemText
              }
            >
              °c
            </Text>
          </View>
          {icon.animate === true ? (
            <Image source={icon.icon} style={styles.icon} />
          ) : (
            <LottieView
              source={icon.icon}
              style={styles.icon}
              hardwareAccelerationAndroid
            />
          )}
          {daily ? (
            <Text
              style={
                isDark
                  ? { ...styles.itemTextDaily, color: colors.whiteGray }
                  : styles.itemTextDaily
              }
            >
              {currentWeekDay}, {day}
            </Text>
          ) : (
            <Text
              style={
                isDark
                  ? { ...styles.itemText, color: colors.whiteGray }
                  : styles.itemText
              }
            >
              {hours}:00
            </Text>
          )}
        </View>
      </Touchable>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    height: 130,
    justifyContent: "space-evenly",
    width: 100,
  },
  itemDaily: {
    alignItems: "center",
    height: 130,
    justifyContent: "space-evenly",
    width: 110,
  },
  itemText: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 16,
  },
  icon: {
    height: 60,
    width: 60,
  },
  tempWrapper: {
    flexDirection: "row",
  },
  temp: {
    fontFamily: "lexend-semi-bold",
    color: colors.mainTextColor,
    fontSize: 16,
  },
  midnight: {
    backgroundColor: colors.mainTextColor,
    width: 1,
    height: "100%",
    justifyContent: "center",
  },
  midnightDate: {
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
    width: 100,
    transform: [{ rotate: "270deg" }],
    textAlign: "center",
    left: -51,
    fontSize: 16,
    backgroundColor: "white",
  },
  itemTextDaily: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 14,
  },
});

export default ForecastItem;
