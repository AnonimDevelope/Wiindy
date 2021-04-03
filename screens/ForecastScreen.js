import React from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";

import ForecastMain from "../components/Forecast/ForecastMain";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import Forecast from "../components/Forecast/Forecast";
import colors from "../constants/colors";

const ForecastScreen = ({ route }) => {
  //const { forecast } = route.params;
  //console.log(forecast);

  return (
    // <ScrollView style={styles.screen}>
    //   <ForecastMain
    //     temperature={forecast.current.temp}
    //     status={forecast.current.weather[0].main}
    //     countryCode={forecast.countryCode}
    //     city={forecast.city}
    //   />
    //   <View style={styles.more}>
    //     <Text style={styles.heading}>Hourly</Text>
    //     <Forecast forecast={forecast.hourly} />
    //     <Text style={styles.heading}>Daily</Text>
    //     <Forecast daily forecast={forecast.daily} />
    //     <Text style={styles.heading}>Details</Text>
    //     <ForecastDetails
    //       humidity={forecast.current.humidity}
    //       windSpeed={forecast.current.wind_speed}
    //       cloudiness={forecast.current.clouds}
    //     />
    //   </View>
    // </ScrollView>
    <View></View>
  );
};

let margin = Dimensions.get("window").height - 695;
if (margin < 0) {
  margin = 10;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    //paddingHorizontal: 15,
  },
  more: {
    marginTop: margin,
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.mainTextColor,
    fontFamily: "lexend-semi-bold",
    fontSize: 20,
  },
});

export default ForecastScreen;
