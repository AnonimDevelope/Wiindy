import React, { useMemo } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";
import LocationItem from "../components/Locations/LocationItem";
import { checkForecast, deleteLocation } from "../store/actions/actions";

const LocationsScreen = ({ navigation }) => {
  const locations = useSelector((state) => state.locations);
  const forecasts = useSelector((state) => state.forecast);
  const isDark = useSelector((state) => state.settings.darkMode);

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
            isDark={isDark}
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
  }, [forecasts, isDark]);

  return (
    <View style={isDark ? styles.screenDark : styles.screen}>
      {!locations || locations.length === 0 ? (
        <Text
          style={
            isDark
              ? { ...styles.emptyText, color: colors.whiteGray }
              : styles.emptyText
          }
        >
          Swipe to search your city
        </Text>
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
  screenDark: {
    flex: 1,
    backgroundColor: colors.backgroundColorDark,
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
