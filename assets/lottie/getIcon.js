const getIcon = (iconId, id, isItem, isDark) => {
  if (id === 531 || id === 522 || id === 521) {
    if (isItem && isDark) {
      return { icon: require("./gif/shower-dayDark.gif"), animate: true };
    } else if (isItem) {
      return { icon: require("./gif/shower-day.gif"), animate: true };
    } else {
      return { icon: require("./shower-day.json"), animate: true };
    }
  } else {
    switch (iconId) {
      case "01d":
        return { icon: require("./clear-day.json"), animate: false };
      case "01n":
        return { icon: require("./clear-night.json"), animate: false };
      case "02d":
        return { icon: require("./partly-cloudy.json"), animate: false };
      case "02n":
        return { icon: require("./partly-cloudy-night.json"), animate: false };
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return { icon: require("./clouds.json"), animate: false };
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        if (isItem && isDark) {
          return { icon: require("./gif/rainDark.gif"), animate: true };
        } else if (isItem) {
          return { icon: require("./gif/rain.gif"), animate: true };
        } else {
          return { icon: require("./rain.json"), animate: true };
        }
      case "11d":
      case "11n":
        if (isItem && isDark) {
          return { icon: require("./gif/stormDark.gif"), animate: true };
        } else if (isItem) {
          return { icon: require("./gif/storm.gif"), animate: true };
        } else {
          return { icon: require("./storm.json"), animate: true };
        }
      case "13d":
      case "13n":
        if (isItem && isDark) {
          return { icon: require("./gif/snowDark.gif"), animate: true };
        } else if (isItem) {
          return { icon: require("./gif/snow.gif"), animate: true };
        } else {
          return { icon: require("./snow.json"), animate: true };
        }
      case "50d":
        return { icon: require("./foggy.json"), animate: false };
      case "50n":
        return { icon: require("./mist.json"), animate: false };

      default:
        return { icon: require("./partly-cloudy.json"), animate: false };
    }
  }
};

export default getIcon;
