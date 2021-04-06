import React, { useMemo } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";
import LocationItem from "../components/Locations/LocationItem";
import { checkForecast, deleteLocation } from "../store/actions/actions";

const LocationsScreen = ({ navigation }) => {
  const locations = useSelector((state) => state.locations);
  const forecasts = useSelector((state) => state.forecast);

  const dispatch = useDispatch();

  const list = useMemo(() => {
    return (
      <FlatList
        onRefresh={() => {
          if (forecasts.length > 0) {
            dispatch(checkForecast(forecasts, true));
          }
        }}
        refreshing={false}
        data={locations}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(itemData) => (
          <LocationItem
            location={`${itemData.item.city}, ${itemData.item.country}`}
            currentForecast={
              forecasts.find((item) => item.city === itemData.item.city).current
            }
            onPress={() =>
              navigation.navigate("Forecast", {
                location: itemData.item,
              })
            }
            onDelete={() =>
              dispatch(
                deleteLocation(
                  itemData.item.city,
                  [...locations],
                  [...forecasts]
                )
              )
            }
          />
        )}
      />
    );
  }, [forecasts]);

  return (
    <View style={styles.screen}>
      {!locations || locations.length === 0 ? (
        <Text style={styles.emptyText}>Swipe to search your city</Text>
      ) : (
        list
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
  },
  emptyText: {
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
});

export default LocationsScreen;
