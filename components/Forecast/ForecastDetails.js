import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

const ForecastDetails = (props) => (
  <View style={styles.main}>
    <View style={styles.sideContainer}>
      <Text style={styles.value}>56</Text>
      <Icon name="weather-windy" size={35} />
      <Text style={styles.label}>Wind Flow</Text>
    </View>
    <View style={styles.centerContainer}>
      <Text style={styles.value}>56</Text>
      <Icon name="weather-pouring" size={35} />
      <Text style={styles.label}>Precipitation Chance</Text>
    </View>
    <View style={styles.sideContainer}>
      <Text style={styles.value}>56</Text>
      <Icon name="water-percent" size={35} />
      <Text style={styles.label}>Humidity</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    maxHeight: 150,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
  },
  sideContainer: {
    height: 150,
    width: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  centerContainer: {
    height: 150,
    width: "40%",
    borderColor: "#F8FAFF",
    borderRightWidth: 2,
    borderLeftWidth: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  value: {
    fontSize: 40,
    color: "#A6D5FE",
    fontFamily: "lexend-semi-bold",
  },
  label: {
    fontFamily: "lexend-semi-bold",
    color: colors.mainTextColor,
    maxWidth: 100,
    textAlign: "center",
  },
});

export default ForecastDetails;
