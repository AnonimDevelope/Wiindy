import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../constants/colors";

const GpsLocationsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>GPS Location</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
  },
});

export default GpsLocationsScreen;
