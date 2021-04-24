import React, { useRef, memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../constants/colors";
import getIcon from "../../assets/lottie/getIcon";
import { useFocusEffect } from "@react-navigation/native";

const ForecastMain = ({
  temperature,
  city,
  countryCode,
  status,
  iconId,
  id,
  isDark,
  isImperial,
}) => {
  const icon = getIcon(iconId, id);

  const lottieRef = useRef(null);

  useFocusEffect(() => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 100);
  });

  return (
    <View style={styles.main}>
      <LottieView
        ref={lottieRef}
        source={icon.icon}
        loop
        autoPlay
        style={styles.icon}
      />
      <View style={styles.temperatureContainer}>
        <Text
          style={
            isDark
              ? { ...styles.temperature, color: colors.whiteGray }
              : styles.temperature
          }
        >
          {isImperial
            ? (temperature * 1.8 + 32).toFixed(0)
            : temperature.toFixed(0)}
        </Text>
        <Text
          style={
            isDark
              ? { ...styles.celsius, color: colors.whiteGray }
              : styles.celsius
          }
        >
          {isImperial ? "°F" : "°c"}
        </Text>
      </View>
      <Text
        style={
          isDark
            ? { ...styles.location, color: colors.whiteGray }
            : styles.location
        }
      >
        {city}, {countryCode}
      </Text>
      <Text
        style={
          isDark ? { ...styles.status, color: colors.whiteGray } : styles.status
        }
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
    fontSize: 20,
  },
  status: {
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
    fontSize: 20,
  },
  temperature: {
    color: colors.mainTextColor,
    fontSize: 60,
    fontFamily: "lexend-semi-bold",
  },
  celsius: {
    fontFamily: "lexend-light",
    fontSize: 40,
    color: colors.mainTextColor,
  },
  temperatureContainer: {
    flexDirection: "row",
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  icon: {
    height: 320,
    width: 320,
  },
});

export default memo(ForecastMain);
