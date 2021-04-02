import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { addLocation, addForecast } from "../store/actions/actions";
import colors from "../constants/colors";

import IconButton from "../components/UI/IconButton";
import LocationItem from "../components/Locations/LocationItem";

const SearchLocationScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [cities, setSities] = useState([]);

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Search"
          style={styles.headerSearch}
          autoCorrect={false}
          autoFocus
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={findCity}
        />
      ),
      headerRight: () => (
        <IconButton
          name="magnify"
          style={{ marginRight: 15 }}
          onPress={() => {
            findCity();
            Keyboard.dismiss();
          }}
        />
      ),
    });
  });

  const findCity = async () => {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${searchValue}`,
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
    setSities(data.data);
  };

  if (cities.length === 0) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Text style={styles.emptyText}>Search your City</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item) => `${item.id}`}
        data={cities}
        renderItem={(itemData) => (
          <LocationItem
            location={`${itemData.item.city}, ${itemData.item.country}`}
            onPress={() => {
              dispatch(addLocation(itemData.item));
              dispatch(addForecast(itemData.item));
            }}
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
  headerSearch: {
    //borderBottomWidth: 1,
    fontSize: 18,
    fontFamily: "lexend-regular",
    padding: 7,
    paddingLeft: 3,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 3,
  },
  emptyText: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 20,
    marginTop: 10,
  },
});

export default SearchLocationScreen;
