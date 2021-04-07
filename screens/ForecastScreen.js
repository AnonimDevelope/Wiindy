import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecast } from "../store/actions/actions";

import ForecastMain from "../components/Forecast/ForecastMain";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import Forecast from "../components/Forecast/Forecast";
import colors from "../constants/colors";
import IconButton from "../components/UI/IconButton";

const ForecastScreen = ({ route, navigation }) => {
  const { location } = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const forecasts = useSelector((state) => state.forecast);
  const forecast = forecasts.find((item) => item.city === location.city);

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [forecasts]);

  return (
    <ScrollView
      style={styles.screen}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            setIsRefreshing(true);
            dispatch(getForecast(location));
          }}
          refreshing={isRefreshing}
        />
      }
    >
      <SafeAreaView>
        <View style={styles.header}>
          <IconButton name="keyboard-backspace" onPress={navigation.goBack} />
        </View>
        <ForecastMain
          temperature={forecast.current.temp}
          status={forecast.current.weather[0].main}
          countryCode={forecast.countryCode}
          city={forecast.city}
          iconId={forecast.current.weather[0].icon}
          id={forecast.current.weather[0].id}
        />
        <View style={styles.more}>
          <Text style={styles.heading}>Hourly</Text>
          <Forecast forecast={forecast.hourly} navigation={navigation} />
          <Text style={styles.heading}>Daily</Text>
          <Forecast daily forecast={forecast.daily} navigation={navigation} />
          <Text style={styles.heading}>Details</Text>
          <ForecastDetails
            leftIconName="weather-windy"
            leftLabel="Wind Speed"
            leftValue={forecast.current.wind_speed}
            centerIconName="cloud-outline"
            centerLabel="Cloudiness"
            centerValue={forecast.current.clouds}
            rightLabel="Humidity"
            rightIconName="water-percent"
            rightValue={forecast.current.humidity}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

let margin = Dimensions.get("window").height - 682;
if (margin < 0) {
  margin = 10;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default ForecastScreen;
