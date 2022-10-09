import RefreshToken from "../models/membership/RefreshToken";
import HttClient from "./base/HttpClient";
import { ServiceObjectResult } from "./base/serviceObjectResult";
import WebApiObjectRequest from "./base/WebApiObjectRequest";
import LocalStrorageService from "./localStorageService";

export default class AuthenticationService {
  private http = new HttClient("Authentication");

  isAuthenticate() {
    const localStrorageService = new LocalStrorageService();
    const token = localStrorageService.getToken();
    const user = localStrorageService.getUser();
    if (token && user && user.id > 0) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    const storageService = new LocalStrorageService();
    storageService.clearToken();
    storageService.clearUser();
  }

  canAccess(permission: string) {
    if (!permission || permission === "IsGlobalAdmin" || this.isGlobalAdmin()) {
      return true;
    }
    const storageService = new LocalStrorageService();
    const user = storageService.getUser();
    if (user && user.permissions.length) {
      return user.permissions.includes(permission);
    } else {
      return false;
    }
  }

  isGlobalAdmin() {
    const storageService = new LocalStrorageService();
    const user = storageService.getUser();
    return user.isGlobalAdmin;
  }

  getRefreshToken() {
    const request = new WebApiObjectRequest<RefreshToken>();
    return this.http.Post<ServiceObjectResult<RefreshToken>>(
      "GetRefreshToken",
      request
    );
  }
}
