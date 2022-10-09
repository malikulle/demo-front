import { Dispatch } from "redux";
import {
  languageAction,
  LanguageActionType,
} from "../../models/action/LanguageActionType";
import LocalStrorageService from "../../service/localStorageService";

const service = new LocalStrorageService();

export const changeSystemLanguage =
  (lang: string) => async (dispatch: Dispatch<languageAction>) => {
    service.setLanguageName(lang);
    dispatch({
      type: LanguageActionType.CHANGE_LANGUAGE,
      payload: lang,
    });
  };
