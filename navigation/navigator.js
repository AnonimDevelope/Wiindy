import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import ForecastScreen from "../screens/ForecastScreen";

const defaultStackOptions = {
  headerTitleAlign: "center",
};

const ForecastStack = createNativeStackNavigator();
const ForecastStackScreen = () => (
  <ForecastStack.Navigator>
    <ForecastStack.Screen
      name="Forecast"
      component={ForecastScreen}
      options={{
        headerCenter: () => (
          <Text
            style={{
              fontSize: 25,
              fontFamily: "lexend-semi-bold",
              color: "#8C8C8C",
            }}
          >
            Weather
          </Text>
        ),
      }}
    />
  </ForecastStack.Navigator>
);

export default ForecastStackScreen;
