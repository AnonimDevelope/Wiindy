import React from "react";
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

const Touchable = (props) => {
  let Touch = TouchableHighlight;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touch = TouchableNativeFeedback;
  }

  return <Touch {...props}>{props.children}</Touch>;
};

export default Touchable;
