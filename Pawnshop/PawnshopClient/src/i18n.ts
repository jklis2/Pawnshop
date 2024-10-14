import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enSettings from "./translations/settings/en.json";
import plSettings from "./translations/settings/pl.json";
import enWelcome from "./translations/welcome/en.json";
import plWelcome from "./translations/welcome/pl.json";

const resources = {
  en: {
    settings: enSettings,
    welcome: enWelcome,
  },
  pl: {
    settings: plSettings,
    welcome: plWelcome,
  },
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
