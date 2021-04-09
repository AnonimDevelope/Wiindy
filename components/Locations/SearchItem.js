import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Touchable from "../UI/Touchable";

const SearchItem = ({ location, onPress, isDark }) => (
  <View style={styles.wrapper}>
    <Touchable onPress={onPress}>
      <View
        style={
          isDark
            ? { ...styles.item, backgroundColor: colors.cardColor }
            : styles.item
        }
      >
        <Text
          style={
            isDark ? { ...styles.text, color: colors.whiteGray } : styles.text
          }
        >
          {location}
        </Text>
        <Icon
          name="map-marker-outline"
          color={isDark ? colors.whiteGray : colors.mainTextColor}
          size={25}
        />
      </View>
    </Touchable>
  </View>
);

const styles = StyleSheet.create({
  item: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 7,
    minWidth: "100%",
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 20,
    maxWidth: "90%",
  },
  wrapper: {
    borderRadius: 7,
    overflow: "hidden",
    elevation: 7,
    marginVertical: 5,
    width: "93%",
    minWidth: "93%",
  },
});

export default SearchItem;
