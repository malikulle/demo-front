export enum LanguageActionType {
    CHANGE_LANGUAGE  = "CHANGE_LANGUAGE"
}

interface actionSuccess {
    type : LanguageActionType.CHANGE_LANGUAGE,
    payload : string
}

export type languageAction = actionSuccess