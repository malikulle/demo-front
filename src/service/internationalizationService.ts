import LocalStrorageService from "./localStorageService";
import en from "../internationalization/languages/en.json";
import tr from "../internationalization/languages/tr.json";

export default class InternationalizationService {
  languages = [
    { id: 1, name: "tr" },
    { id: 2, name: "en" },
  ];

  getDefaultLanguageID() {
    const lang = 'tr';
    return Number(this.languages.find((x) => x.name === lang)?.id);
  }

  getCurrentLanguageID(lang : string){
    return Number(this.languages.find((x) => x.name === lang)?.id);
  }

  getWord(key: string) {
    const langData = JSON.parse(JSON.stringify(this.getLangData()));
    return langData[key];
  }
  getLangData() {
    const storageService = new LocalStrorageService();
    const lang = storageService.getLanguageName();
    switch (lang) {
      case "tr":
        return tr;
      case "en":
        return en;
      default:
        return tr;
    }
  }
  getTranslationFor(item: any, languageID: number, i18n: string, key: string) {
    let value = "";
    if (item && item[key]) {
      if (
        item[i18n] &&
        item[i18n].length > 0 &&
        item[i18n].findIndex((x: any) => x.languageID === languageID) > -1
      ) {
        const translation = item[i18n].find(
          (x: any) => x.languageID === languageID
        );
        value = translation[key];
      } else {
        value = item[key];
      }
    }
    return value;
  }
  }
