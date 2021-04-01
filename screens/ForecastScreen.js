import React from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";

import ForecastMain from "../components/Forecast/ForecastMain";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import Forecast from "../components/Forecast/Forecast";

const ForecastScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <ForecastMain />
      <View style={styles.more}>
        <Text style={styles.heading}>Hourly</Text>
        <Forecast />
        <Text style={styles.heading}>Daily</Text>
        <Forecast daily />
        <Text style={styles.heading}>Details</Text>
        <ForecastDetails />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F9FE",
    //paddingHorizontal: 15,
  },
  more: {
    marginTop: Dimensions.get("window").height - 695,
    paddingHorizontal: 15,
  },
  heading: {
    color: "#565A5D",
    fontFamily: "lexend-semi-bold",
    fontSize: 20,
  },
});

export default ForecastScreen;
