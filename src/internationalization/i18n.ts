import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LocalStrorageService from "../service/localStorageService";
import en from "./languages/en.json"
import tr from "./languages/tr.json"

const service = new LocalStrorageService();

const lang = String(service.getLanguageName());

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: en
    },
    tr: {
      translations: tr
    },
  },
  fallbackLng: lang,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation : {
    escapeValue :false,
    formatSeparator :','
  }
});


export default i18n