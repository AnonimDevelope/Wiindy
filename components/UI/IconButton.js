import React from "react";
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

let Touchable = TouchableHighlight;
if (Platform.OS === "android" && Platform.Version >= 21) {
  Touchable = TouchableNativeFeedback;
}

const IconButton = ({
  name,
  size = 25,
  color = colors.mainTextColor,
  style,
  onPress,
  innerStyle = { padding: 10, borderRadius: 50 },
}) => {
  return (
    <View style={{ borderRadius: 50, overflow: "hidden", ...style }}>
      <Touchable onPress={onPress}>
        <View style={innerStyle}>
          <Icon name={name} size={size} color={color} />
        </View>
      </Touchable>
    </View>
  );
};

export default IconButton;
