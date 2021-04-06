import React, { useState } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import colors from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { usePermissions } from "expo-permissions";
import { useDispatch } from "react-redux";
import { setLocations, getForecast } from "../store/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Activity from "../components/UI/Activity";
import SearchItem from "../components/Locations/SearchItem";

const GpsLocationsScreen = ({ navigation }) => {
  const [permission, askForPermission] = usePermissions(Permissions.LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState(null);

  const dispatch = useDispatch();

  const getLocation = async () => {
    await askForPermission();
    if (permission || permission.status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      return location.coords;
    } else {
      setIsLoading(false);
    }
  };

  const isPlus = (num) => {
    if (num > 0) {
      return "+";
    } else {
      return "";
    }
  };

  const addLocation = async (location) => {
    const value = await AsyncStorage.getItem("locations");
    if (value !== null) {
      const locationsArr = [...JSON.parse(value).data];
      const index = locationsArr.find((loc) => loc.city === location.city);
      if (index) {
        return;
      }
      const modValue = {
        data: [location, ...locationsArr],
      };
      await AsyncStorage.setItem("locations", JSON.stringify(modValue));
      dispatch(setLocations(modValue.data));
    } else {
      const newValue = { data: [location] };
      await AsyncStorage.setItem("locations", JSON.stringify(newValue));
      dispatch(setLocations(newValue.data));
    }
  };

  const getCities = async () => {
    setIsLoading(true);
    const location = await getLocation();
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${isPlus(
        location.latitude
      )}${location.latitude.toFixed(4)}${isPlus(
        location.longitude
      )}${location.longitude.toFixed(4)}/nearbyCities?radius=100`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "35c5504899msh98c20e1a35d0951p1c8bbejsn53fc0aef7cf0",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    setIsLoading(false);
    setCities(data.data);
  };

  if (isLoading && cities === null) {
    return (
      <View style={styles.screenEmpty}>
        <Activity />
      </View>
    );
  }

  return (
    <View style={cities ? styles.screen : styles.screenEmpty}>
      {cities ? (
        <FlatList
          onRefresh={getCities}
          refreshing={isLoading}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => `${item.id}`}
          data={cities}
          renderItem={(itemData) => (
            <SearchItem
              location={`${itemData.item.city}, ${itemData.item.country}`}
              onPress={() => {
                addLocation(itemData.item);
                dispatch(getForecast(itemData.item));
                navigation.goBack();
              }}
            />
          )}
        />
      ) : (
        <Button title="Get near cities" onPress={getCities} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  screenEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
  },
  list: {
    alignItems: "center",
    marginTop: 13,
    paddingBottom: 60,
  },
});

export default GpsLocationsScreen;
