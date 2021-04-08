import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { List, Switch } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const SettingsScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedUnits, setSelectedUnits] = useState("metric");
  const [simpleAnimations, setSimpleAnimations] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.screen}>
      <List.Section>
        {/* <List.Subheader>Some title</List.Subheader> */}
        <List.Item
          title="Dark Mode"
          description="auto | on"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
            />
          )}
        />
        <List.Item
          title="Simple animations"
          description="Can be smoother"
          left={() => <List.Icon icon="speedometer" />}
          right={() => (
            <Switch
              value={simpleAnimations}
              onValueChange={() => setSimpleAnimations(!simpleAnimations)}
            />
          )}
        />
        <List.Item
          title="Units"
          description="Used units system"
          left={() => <List.Icon icon="ruler" />}
          right={() => (
            <Picker
              selectedValue={selectedUnits}
              style={{ width: 120 }}
              onValueChange={(itemValue) => setSelectedUnits(itemValue)}
            >
              <Picker.Item label="Metric" value="metric" />
              <Picker.Item label="Imperial" value="imperial" />
            </Picker>
          )}
        />
        <List.Item
          title="Language"
          description="Interface language"
          left={() => <List.Icon icon="translate" />}
          right={() => (
            <Picker
              selectedValue={selectedLanguage}
              style={{ width: 120 }}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="English" value="en" />
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
});

export default SettingsScreen;
