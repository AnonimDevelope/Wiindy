import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Activity = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#65aceb" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Activity;
