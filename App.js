import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import reducer from "./store/reducers/reducer";
import { enableScreens } from "react-native-screens";
enableScreens();
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator, {
  NativeForecastScreen as NativeNavigator,
} from "./navigation/navigator";
import AnimatedSplash from "./components/UI/Splash/AnimatedSplash";
import {
  setLocations,
  setForecast,
  checkForecast,
  checkDone,
  setSettings,
} from "./store/actions/actions";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import i18n from "i18n-js";
import { setStatusBarStyle } from "expo-status-bar";
import translations from "./translations";
import colors from "./constants/colors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const askNotificationPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};

const TASK_NAME = "BACKGROUND_TASK";
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const isNotifPermited = await askNotificationPermissions();
    if (isNotifPermited === false) {
      return BackgroundFetch.Result.NoData;
    }
    const notifLocations = await AsyncStorage.getItem("notifLocations");
    let hasChanged;
    if (notifLocations !== null) {
      const notifLocationsArr = JSON.parse(notifLocations).data;
      if (notifLocationsArr.length > 0) {
        const cachedForecastStr = await AsyncStorage.getItem("forecast");
        const cachedForecastArr = JSON.parse(cachedForecastStr).data;
        for (const city of notifLocationsArr) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely&units=metric&appid=5b0815041cbc828c8ef3a2523c4b2eb3`
          );

          const data = await response.json();
          Notifications.scheduleNotificationAsync({
            content: {
              title: `${city.city}: ${data.current.temp.toFixed(0)}°c`,
              body: `${data.current.weather[0].description}`,
            },
            trigger: {
              seconds: 5,
            },
          });
          hasChanged = true;
          const index = cachedForecastArr.indexOf(
            cachedForecastArr.find((item) => item.city === city.city)
          );
          cachedForecastArr[index] = {
            ...data,
            city: city.city,
            country: city.country,
            countryCode: city.countryCode,
          };
        }
        AsyncStorage.setItem(
          "forecast",
          JSON.stringify({ data: cachedForecastArr })
        );
      }
    }
    return hasChanged
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (err) {
    return BackgroundFetch.Result.Failed;
  }
});

export default function App() {
  const [isInitialFetchgDone, setIsInitialFetchDone] = useState(false);
  const [renderDefaultSplash, setRenderDefaultSplash] = useState(true);
  const [settings, setSettings] = useState({});

  let [fontsLoaded] = useFonts({
    "lexend-light": require("./assets/fonts/Lexend-Light.ttf"),
    "lexend-regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "lexend-semi-bold": require("./assets/fonts/Lexend-SemiBold.ttf"),
    "caveat-semiBold": require("./assets/fonts/Caveat-SemiBold.ttf"),
  });

  useEffect(() => {
    askNotificationPermissions();
  }, [askNotificationPermissions]);

  useEffect(() => {
    RegisterBackgroundTask = async () => {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        startOnBoot: true,
        stopOnTerminate: false,
        minimumInterval: 3000,
      });
    };
    RegisterBackgroundTask();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRenderDefaultSplash(false);
    }, 50);
  }, []);

  let usingScheme;
  if (settings.darkMode) {
    usingScheme = DarkTheme;
    setStatusBarStyle("light");
  } else {
    usingScheme = DefaultTheme;
    setStatusBarStyle("dark");
  }

  const paperDarkTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      text: colors.whiteGray,
      surface: "#191d24",
    },
  };

  if (renderDefaultSplash) {
    return <AppLoading />;
  }

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={fontsLoaded && isInitialFetchgDone}
      logoImage={require("./assets/weather-icon.png")}
      backgroundColor={"#F3F9FE"}
      logoHeight={150}
      logoWidth={150}
    >
      <Provider store={store}>
        <ReduxAccess
          onCheckDone={() => setIsInitialFetchDone(true)}
          onSetSettings={(settings) => setSettings(settings)}
        >
          {fontsLoaded && isInitialFetchgDone && (
            <PaperProvider
              theme={settings.darkMode ? paperDarkTheme : PaperDefaultTheme}
            >
              <NavigationContainer theme={usingScheme}>
                {settings.simpleAnimations ? (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: settings.darkMode ? "#181b21" : "white",
                    }}
                  >
                    <NativeNavigator isDark={settings.darkMode} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: settings.darkMode ? "#181b21" : "white",
                    }}
                  >
                    <Navigator isDark={settings.darkMode} />
                  </View>
                )}
              </NavigationContainer>
            </PaperProvider>
          )}
        </ReduxAccess>
      </Provider>
    </AnimatedSplash>
  );
}

const ReduxAccess = ({ children, onCheckDone, onSetSettings }) => {
  //  Used for accessing redux store in root component
  const isCheckForecastDone = useSelector((state) => state.forecastChecked);
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    i18n.translations = translations;
    i18n.locale = settings.lang || "en";
    i18n.fallbacks = true;
    onSetSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (isCheckForecastDone) {
      onCheckDone();
    }
  }, [isCheckForecastDone]);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await AsyncStorage.getItem("locations");
      if (locations !== null) {
        dispatch(setLocations(JSON.parse(locations).data));
      }
    };
    const getForecasts = async () => {
      const forecasts = await AsyncStorage.getItem("forecast");
      if (forecasts !== null) {
        const forecastArray = JSON.parse(forecasts).data;
        dispatch(setForecast(forecastArray));
        dispatch(checkForecast(forecastArray));
      } else {
        dispatch(checkDone());
      }
    };
    const getSettings = async () => {
      const settingsStr = await AsyncStorage.getItem("settings");
      if (settingsStr !== null) {
        const settingsObj = JSON.parse(settingsStr);
        onSetSettings(settingsObj);
        dispatch(setSettings(settingsObj));
      } else {
        const newSettings = {
          darkMode: false,
          simpleAnimations: false,
          units: "metric",
          lang: "en",
        };
        onSetSettings(newSettings);
        dispatch(setSettings(newSettings));
        AsyncStorage.setItem("settings", JSON.stringify(newSettings));
      }
    };
    getSettings();
    getLocations();
    getForecasts();
  }, []);

  return children;
};
