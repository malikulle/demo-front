import { UserLoginResponse } from "../../models/membership/userLoginResponse";
import { Dispatch } from "redux";
import {
  userLoginAction,
  userLoginActionType,
} from "../../models/action/UserLoginActionType";
import BaseService from "../../service/BaseService";

export const userLogin =
  (response: UserLoginResponse) =>
  async (dispatch: Dispatch<userLoginAction>) => {
    const service = new BaseService();
    service.LocalStorage.addToken(response.token);
    service.LocalStorage.addUser(response);
    dispatch({
      type: userLoginActionType.POST_USERLOGIN_SUCCESS,
      payload: response,
    });
  };

export const refreshToken =
  (response: UserLoginResponse) =>
  async (dispatch: Dispatch<userLoginAction>) => {
    const service = new BaseService();
    service.LocalStorage.addToken(response.token);
    service.LocalStorage.addUser(response);
    dispatch({
      type: userLoginActionType.POST_REFRESH_TOKEN_SUCCESS,
      payload: response,
    });
  };
export const logoutUser = () => async (dispatch: Dispatch<userLoginAction>) => {
  const service = new BaseService();
  service.Authentication.logout();
  dispatch({
    type: userLoginActionType.LOGOUT_SUCCESS,
    payload: new UserLoginResponse(),
  });
};
