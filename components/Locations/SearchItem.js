import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let Touchable = TouchableHighlight;
if (Platform.OS === "android" && Platform.Version >= 21) {
  Touchable = TouchableNativeFeedback;
}

const SearchItem = ({ location, onPress }) => (
  <View style={styles.wrapper}>
    <Touchable onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.text}>{location}</Text>
        <Icon
          name="map-marker-outline"
          color={colors.mainTextColor}
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
