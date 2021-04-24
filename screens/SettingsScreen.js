import React, { useState, useEffect } from "react";
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
import Activity from "../components/UI/Activity";
import i18n from "i18n-js";

const SettingsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const settings = useSelector((state) => state.settings);
  const lang = settings.lang;

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [lang]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t("settings.title"),
    });
  }, [navigation]);

  if (isLoading) {
    return <Activity />;
  }

  return (
    <View style={settings.darkMode ? styles.screenDark : styles.screen}>
      <List.Section>
        <List.Item
          title={i18n.t("settings.darkMode")}
          titleStyle={settings.darkMode ? { color: colors.whiteGray } : null}
          descriptionStyle={
            settings.darkMode ? { color: colors.whiteGray } : null
          }
          description={i18n.t("settings.darkModeDesc")}
          left={() => (
            <List.Icon
              icon="theme-light-dark"
              color={settings.darkMode && colors.whiteGray}
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
          title={i18n.t("settings.animations")}
          description={i18n.t("settings.animationsDesc")}
          titleStyle={settings.darkMode ? { color: colors.whiteGray } : null}
          descriptionStyle={
            settings.darkMode ? { color: colors.whiteGray } : null
          }
          left={() => (
            <List.Icon
              icon="speedometer"
              color={settings.darkMode && colors.whiteGray}
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
          title={i18n.t("settings.units")}
          description={i18n.t("settings.unitsDesc")}
          titleStyle={settings.darkMode ? { color: colors.whiteGray } : null}
          descriptionStyle={
            settings.darkMode ? { color: colors.whiteGray } : null
          }
          left={() => (
            <List.Icon
              icon="ruler"
              color={settings.darkMode && colors.whiteGray}
            />
          )}
          right={() => (
            <Picker
              selectedValue={settings.units}
              style={
                settings.darkMode
                  ? { width: 120, color: colors.whiteGray }
                  : { width: 120 }
              }
              onValueChange={(itemValue) => dispatch(setUnits(itemValue))}
            >
              <Picker.Item
                label={i18n.t("settings.unitsMetric")}
                value="metric"
              />
              <Picker.Item
                label={i18n.t("settings.unitsImperial")}
                value="imperial"
              />
            </Picker>
          )}
        />
        <List.Item
          title={i18n.t("settings.language")}
          description={i18n.t("settings.languageDesc")}
          titleStyle={settings.darkMode ? { color: colors.whiteGray } : null}
          descriptionStyle={
            settings.darkMode ? { color: colors.whiteGray } : null
          }
          left={() => (
            <List.Icon
              icon="translate"
              color={settings.darkMode && colors.whiteGray}
            />
          )}
          right={() => (
            <Picker
              selectedValue={settings.lang}
              style={
                settings.darkMode
                  ? { width: 120, color: colors.whiteGray }
                  : { width: 120 }
              }
              onValueChange={(itemValue) => {
                setIsLoading(true);
                dispatch(setLanguage(itemValue));
              }}
            >
              <Picker.Item label={i18n.t("settings.languageEn")} value="en" />
              <Picker.Item label={i18n.t("settings.languageRo")} value="ro" />
              <Picker.Item label={i18n.t("settings.languageRu")} value="ru" />
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
