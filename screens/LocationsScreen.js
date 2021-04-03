import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import colors from "../constants/colors";
import LocationItem from "../components/Locations/LocationItem";

const LocationsScreen = ({ navigation }) => {
  const forecast = useSelector((state) => state.forecast);
  const locations = useSelector((state) => state.locations);

  return (
    <View style={styles.screen}>
      <FlatList
        data={locations}
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(itemData) => (
          <LocationItem
            location={`${itemData.item.city}, ${itemData.item.country}`}
            onPress={() =>
              navigation.navigate("Forecast", {
                forecast: forecast.find(
                  (item) => item.city === itemData.item.city
                ),
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
  },
});

export default LocationsScreen;
