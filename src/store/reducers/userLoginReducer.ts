import {
  userLoginAction,
  userLoginActionType,
} from "../../models/action/UserLoginActionType";
import { UserLoginResponse } from "../../models/membership/userLoginResponse";
import initialState from "../initialState";

interface State {
  userLogin: UserLoginResponse;
}

export const userLoginReducer = (
  state: State = initialState,
  action: userLoginAction
): State => {
  switch (action.type) {
    case userLoginActionType.POST_USERLOGIN_SUCCESS:
      return {
        userLogin: action.payload,
      };
    case userLoginActionType.POST_REFRESH_TOKEN_SUCCESS:
      return {
        userLogin: action.payload,
      };
    case userLoginActionType.LOGOUT_SUCCESS:
      return {
        userLogin: action.payload,
      };
    default:
      return state;
  }
};
