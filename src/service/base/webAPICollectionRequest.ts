import Dynamic from "./Dynamic";

export class WebAPICollectionRequest<T> {
  public data: T | undefined;
  public page: number = 1;
  public pageSize: number = 10;
  public dynamicFilter : Dynamic = new Dynamic()
  public languageID : number = 0
}
