import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { List, Switch } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import {
  setDarkMode,
  setSimpleAnimations,
  setUnits,
  setLanguage,
} from "../store/actions/actions";

const SettingsScreen = () => {
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  return (
    <View style={settings.darkMode ? styles.screenDark : styles.screen}>
      <List.Section>
        {/* <List.Subheader>Some title</List.Subheader> */}
        <List.Item
          title="Dark Mode"
          titleStyle={settings.darkMode && { color: "white" }}
          descriptionStyle={settings.darkMode && { color: "white" }}
          description="auto | on"
          left={() => (
            <List.Icon
              icon="theme-light-dark"
              color={settings.darkMode && "white"}
            />
          )}
          right={() => (
            <Switch
              value={settings.darkMode}
              onValueChange={() => dispatch(setDarkMode(!settings.darkMode))}
            />
          )}
        />
        <List.Item
          title="Optimized animations"
          description="Smoother experience"
          titleStyle={settings.darkMode && { color: "white" }}
          descriptionStyle={settings.darkMode && { color: "white" }}
          left={() => (
            <List.Icon
              icon="speedometer"
              color={settings.darkMode && "white"}
            />
          )}
          right={() => (
            <Switch
              value={settings.simpleAnimations}
              onValueChange={() =>
                dispatch(setSimpleAnimations(!settings.simpleAnimations))
              }
            />
          )}
        />
        <List.Item
          title="Units"
          description="Used units system"
          titleStyle={settings.darkMode && { color: "white" }}
          descriptionStyle={settings.darkMode && { color: "white" }}
          left={() => (
            <List.Icon icon="ruler" color={settings.darkMode && "white"} />
          )}
          right={() => (
            <Picker
              selectedValue={settings.units}
              style={
                settings.darkMode
                  ? { width: 120, color: "white" }
                  : { width: 120 }
              }
              onValueChange={(itemValue) => dispatch(setUnits(itemValue))}
            >
              <Picker.Item label="Metric" value="metric" />
              <Picker.Item label="Imperial" value="imperial" />
            </Picker>
          )}
        />
        <List.Item
          title="Language"
          description="Interface language"
          titleStyle={settings.darkMode && { color: "white" }}
          descriptionStyle={settings.darkMode && { color: "white" }}
          left={() => (
            <List.Icon icon="translate" color={settings.darkMode && "white"} />
          )}
          right={() => (
            <Picker
              selectedValue={settings.lang}
              style={
                settings.darkMode
                  ? { width: 120, color: "white" }
                  : { width: 120 }
              }
              onValueChange={(itemValue) => dispatch(setLanguage(itemValue))}
            >
              <Picker.Item label="English" value="eng" />
              <Picker.Item label="Romanian" value="ro" />
              <Picker.Item label="Russian" value="ru" />
            </Picker>
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  screenDark: {
    flex: 1,
    backgroundColor: colors.backgroundColorDark,
  },
});

export default SettingsScreen;
