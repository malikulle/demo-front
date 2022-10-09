import { UserLoginResponse } from "../models/membership/userLoginResponse";

export enum LocalStorageKeys {
  ACCESS_TOKEN = "accessToken",
  CURRENT_USER = "currentUser",
  LAYOUT_NAME = "layoutName",
  LANGUAGE_NAME = "language",
}

export default class LocalStrorageService {
  addToken(token: string) {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
  }
  getToken() {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  clearToken(){
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN)
  }

  addUser(user: UserLoginResponse) {
    localStorage.setItem(LocalStorageKeys.CURRENT_USER, JSON.stringify(user));
  }
  getUser() {
    var item = localStorage.getItem(LocalStorageKeys.CURRENT_USER);
    if (item) {
      const user = JSON.parse(item || "") as UserLoginResponse;
      return user;
    } else {
      return new UserLoginResponse();
    }
  }
  clearUser(){
    localStorage.removeItem(LocalStorageKeys.CURRENT_USER)
  }

  addLayoutName(layoutName: string) {
    localStorage.setItem(LocalStorageKeys.LAYOUT_NAME, layoutName);
  }

  getLayoutName() {
    return localStorage.getItem(LocalStorageKeys.LAYOUT_NAME) || "NORMAL";
  }

  setLanguageName(name: string) {
    localStorage.setItem(LocalStorageKeys.LANGUAGE_NAME, name);
  }

  getLanguageName(){
    return localStorage.getItem(LocalStorageKeys.LANGUAGE_NAME) || 'tr';
  }

}
