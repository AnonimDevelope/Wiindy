import React from "react";
import { View, StyleSheet } from "react-native";
import ForecastItem from "./ForecastItem";

const Forecast = () => {
  return (
    <View style={styles.main}>
      <ForecastItem />
      <ForecastItem />
      <ForecastItem />
      <ForecastItem />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: 130,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default Forecast;
