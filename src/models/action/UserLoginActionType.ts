import { UserLoginResponse } from "../membership/userLoginResponse";

export enum userLoginActionType {
  POST_USERLOGIN_SUCCESS = "POST_USERLOGIN_SUCCESS",
  POST_REFRESH_TOKEN_SUCCESS = "POST_REFRESH_TOKEN_SUCCESS",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
}

interface actionSuccess {
  type: userLoginActionType.POST_USERLOGIN_SUCCESS;
  payload: UserLoginResponse;
}

interface refreshTokenSucess {
  type: userLoginActionType.POST_REFRESH_TOKEN_SUCCESS;
  payload: UserLoginResponse;
}

interface logoutSuccess {
  type: userLoginActionType.LOGOUT_SUCCESS;
  payload: UserLoginResponse;
}

export type userLoginAction =
  | actionSuccess
  | refreshTokenSucess
  | logoutSuccess;
