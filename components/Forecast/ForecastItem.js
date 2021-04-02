import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../constants/colors";

const ForecastItem = ({ temperature, status, timestamp }) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  let day = date.getDate();
  if (day <= 9) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = `0${month}`;
  }
  const year = date.getFullYear();

  const fullDate = `${day}.${month}.${year}`;

  return (
    <React.Fragment>
      {hours === 0 && (
        <View style={styles.midnight}>
          <Text style={styles.midnightDate}>{fullDate}</Text>
        </View>
      )}
      <View style={styles.item}>
        <View style={styles.tempWrapper}>
          <Text style={styles.temp}>{temperature.toFixed(0)}</Text>
          <Text style={styles.itemText}>°c</Text>
        </View>
        <LottieView
          source={require("../../assets/lottie/foggy.json")}
          loop
          //autoPlay
          style={styles.icon}
        />
        <Text style={styles.itemText}>{hours}:00</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    height: 130,
    justifyContent: "space-evenly",
    //backgroundColor: "red",
    width: 100,
  },
  itemText: {
    fontFamily: "lexend-regular",
    color: colors.mainTextColor,
    fontSize: 16,
  },
  icon: {
    height: 60,
    width: 60,
  },
  tempWrapper: {
    flexDirection: "row",
  },
  temp: {
    fontFamily: "lexend-semi-bold",
    color: colors.mainTextColor,
    fontSize: 16,
  },
  midnight: {
    backgroundColor: colors.mainTextColor,
    width: 1,
    height: "100%",
    justifyContent: "center",
  },
  midnightDate: {
    color: colors.mainTextColor,
    fontFamily: "lexend-regular",
    width: 100,
    transform: [{ rotate: "270deg" }],
    textAlign: "center",
    left: -51,
    fontSize: 16,
    backgroundColor: "white",
  },
});

export default ForecastItem;
