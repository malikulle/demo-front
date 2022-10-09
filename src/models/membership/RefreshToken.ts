import { UserLoginResponse } from "./userLoginResponse";

export default class RefreshToken {
  token: string = "";
  user: UserLoginResponse = new UserLoginResponse();
}
