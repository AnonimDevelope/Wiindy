import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  InteractionManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecast } from "../store/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ForecastMain from "../components/Forecast/ForecastMain";
import ForecastDetails from "../components/Forecast/ForecastDetails";
import Forecast from "../components/Forecast/Forecast";
import colors from "../constants/colors";
import IconButton from "../components/UI/IconButton";

const ForecastScreen = ({ route, navigation }) => {
  const { location } = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const dispatch = useDispatch();

  const forecasts = useSelector((state) => state.forecast);
  const forecast = forecasts.find((item) => item.city === location.city);

  const deleteNotifLocation = async () => {
    const notifLocations = await AsyncStorage.getItem("notifLocations");
    const notifLocationsArr = JSON.parse(notifLocations).data;
    notifLocationsArr.splice(
      notifLocationsArr.indexOf(
        notifLocationsArr.find((item) => item.city === location.city)
      ),
      1
    );
    AsyncStorage.setItem(
      "notifLocations",
      JSON.stringify({ data: notifLocationsArr })
    );
    setIsNotifEnabled(false);
  };

  const addNotifLocation = async () => {
    const notifLocations = await AsyncStorage.getItem("notifLocations");
    if (notifLocations !== null) {
      const notifLocationsArr = JSON.parse(notifLocations).data;
      AsyncStorage.setItem(
        "notifLocations",
        JSON.stringify({
          data: [...notifLocationsArr, location],
        })
      );
    } else {
      AsyncStorage.setItem(
        "notifLocations",
        JSON.stringify({ data: [location] })
      );
    }
    setIsNotifEnabled(true);
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsAnimationDone(true);
    });
  }, []);

  useEffect(() => {
    const isNotifEnabledCheck = async () => {
      const notifLocations = await AsyncStorage.getItem("notifLocations");
      if (notifLocations !== null) {
        const notifLocationsArr = JSON.parse(notifLocations).data;
        const exists = notifLocationsArr.find(
          (item) => item.city === location.city
        );
        if (exists) {
          setIsNotifEnabled(true);
        }
      }
    };
    isNotifEnabledCheck();
  }, []);

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
          {isNotifEnabled ? (
            <IconButton name="bell" onPress={deleteNotifLocation} />
          ) : (
            <IconButton name="bell-outline" onPress={addNotifLocation} />
          )}
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
          <Text style={styles.heading}>Daily</Text>
          <Forecast daily forecast={forecast.daily} navigation={navigation} />
          <Text style={styles.heading}>Hourly</Text>
          {isAnimationDone && (
            <Forecast forecast={forecast.hourly} navigation={navigation} />
          )}
          <Text style={styles.heading}>Details</Text>
          {isAnimationDone && (
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
          )}
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
