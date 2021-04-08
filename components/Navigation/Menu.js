import React, { useState } from "react";
import * as Linking from "expo-linking";
import IconButton from "../UI/IconButton";
import { Menu } from "react-native-paper";

const headerMenu = ({ onPressSettings }) => {
  const [isVisible, setIsVisible] = useState(false);

  const redirectToGithubHandler = () => {
    setIsVisible(false);
    Linking.canOpenURL("https://github.com/AnonimDevelope/weatherio").then(
      (supported) => {
        if (supported) {
          Linking.openURL("https://github.com/AnonimDevelope/weatherio");
        } else {
          console.log("Don't know how to open URI: ");
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
          onPress={() => setIsVisible(true)}
        />
      }
    >
      <Menu.Item
        icon="cog"
        title="Settings"
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

// const styles = StyleSheet.create({

// })

export default headerMenu;
