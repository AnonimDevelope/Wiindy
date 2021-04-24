import React, { useState } from "react";
import * as Linking from "expo-linking";
import IconButton from "../UI/IconButton";
import { Menu } from "react-native-paper";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";
import i18n from "i18n-js";

const headerMenu = ({ onPressSettings }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isDark = useSelector((state) => state.settings.darkMode);

  const redirectToGithubHandler = () => {
    setIsVisible(false);
    Linking.canOpenURL("https://github.com/AnonimDevelope/weatherio").then(
      (supported) => {
        if (supported) {
          Linking.openURL("https://github.com/AnonimDevelope/weatherio");
        }
      }
    );
  };

  return (
    <Menu
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
      anchor={
        <IconButton
          name="dots-vertical"
          size={25}
          style={{ marginRight: 15 }}
          color={isDark ? colors.whiteGray : colors.mainTextColor}
          onPress={() => setIsVisible(true)}
        />
      }
    >
      <Menu.Item
        icon="cog"
        title={i18n.t("settings.title")}
        onPress={() => {
          onPressSettings();
          setIsVisible(false);
        }}
      />
      <Menu.Item
        icon="github"
        title="Git Hub"
        onPress={redirectToGithubHandler}
      />
    </Menu>
  );
};

export default headerMenu;
