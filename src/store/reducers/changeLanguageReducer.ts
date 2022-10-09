import {
  languageAction,
  LanguageActionType,
} from "../../models/action/LanguageActionType";
import initialState from "../initialState"

interface State {
  language: string;
}

export const changeLanguageReducer = (
  state: State = initialState,
  action: languageAction
): State => {
  switch (action.type) {
    case LanguageActionType.CHANGE_LANGUAGE:
      return {
        language: action.payload,
      };

    default:
      return {
        ...state
      };
  }
};
