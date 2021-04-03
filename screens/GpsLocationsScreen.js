import React from "react";
import { View, StyleSheet, Text } from "react-native";

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
  },
});

export default GpsLocationsScreen;
