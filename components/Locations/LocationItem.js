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

let Touchable = TouchableHighlight;
if (Platform.OS === "android" && Platform.Version >= 21) {
  Touchable = TouchableNativeFeedback;
}

const LocationItem = ({ location, onPress }) => (
  <View style={styles.wrapper}>
    <Touchable onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.text}>{location}</Text>
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
  },
  text: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 20,
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

export default LocationItem;
