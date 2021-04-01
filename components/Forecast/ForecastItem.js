import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

const ForecastItem = (props) => (
  <View style={styles.item}>
    <View style={styles.tempWrapper}>
      <Text style={styles.temp}>17</Text>
      <Text style={styles.itemText}>°c</Text>
    </View>
    <LottieView
      source={require("../../assets/lottie/foggy.json")}
      loop
      autoPlay
      style={styles.icon}
    />
    <Text style={styles.itemText}>12 p.m</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    height: 130,
    justifyContent: "space-evenly",
    //backgroundColor: "red",
    width: "25%",
  },
  itemText: {
    fontFamily: "lexend-regular",
    color: "#565A5D",
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
    color: "#565A5D",
    fontSize: 16,
  },
});

export default ForecastItem;
