export class UserLoginResponse {
  public id: number = 0;
  public name: string = "";
  public surname: string = "";
  public fullName: string = "";
  public emailAddress: string = "";
  public imagePath: string = "";
  public isGlobalAdmin: boolean = false;
  public token: string = "";
  public permissions: string[] = [];
}
