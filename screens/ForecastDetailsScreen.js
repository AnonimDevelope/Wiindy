import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import ForecastDetails from "../components/Forecast/ForecastDetails";

const ForecastDetailsScreen = (props) => {
  return <View style={styles.screen}></View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default ForecastDetailsScreen;
