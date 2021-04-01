import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

const ForecastMain = (props) => (
  <View style={styles.main}>
    <LottieView
      source={require("../../assets/lottie/foggy.json")}
      loop
      autoPlay
      style={styles.icon}
    />
    <View style={styles.temperatureContainer}>
      <Text style={styles.temperature}>32</Text>
      <Text style={styles.celsius}>°c</Text>
    </View>
    <Text style={styles.location}>London, UK</Text>
    <Text style={styles.status}>Windy</Text>
  </View>
);

const styles = StyleSheet.create({
  location: {
    color: "#565A5D",
    fontFamily: "lexend-regular",
    fontSize: 20,
  },
  status: {
    color: "#565A5D",
    fontFamily: "lexend-regular",
    fontSize: 20,
  },
  temperature: {
    color: "#565A5D",
    fontSize: 60,
    fontFamily: "lexend-semi-bold",
  },
  celsius: {
    fontFamily: "lexend-light",
    fontSize: 40,
    color: "#565A5D",
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

export default ForecastMain;
