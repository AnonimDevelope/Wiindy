import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ForecastItem from "./ForecastItem";

const Forecast = ({ forecast }) => {
  //console.log(forecast);
  return (
    <View style={styles.main}>
      <FlatList
        data={forecast}
        keyExtractor={(item) => `${item.dt}`}
        renderItem={(itemData) => (
          <ForecastItem
            timestamp={itemData.item.dt}
            temperature={itemData.item.temp}
            status={itemData.item.weather[0].main}
          />
        )}
        horizontal
      />
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
