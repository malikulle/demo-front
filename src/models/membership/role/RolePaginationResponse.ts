import Role from "./Role";

export default class RolePaginationResponse {
  public items: Role[] = [];
  public index: number = 0;
  public size: number = 0;
  public count: number = 0;
  public pages: number = 0;
  public hasPrevious: boolean = false;
  public hasNext: boolean = false;
}
