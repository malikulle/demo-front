import OrderBy from "../../../service/base/OrderBy";

export class Category {
  public id: number = 0;
  public name: string = "";
  public statusID: number = 0;
  public orderBy: OrderBy = new OrderBy();
  public category_i18n: Category_i18n[] = [];
}

export class Category_i18n {
  public name: string = "";
  public categoryID: number = 0;
  public languageID: number = 0;
}

export class CategoryPaginationReponse {
  public items: Category[] = [];
  public index: number = 0;
  public size: number = 0;
  public count: number = 0;
  public pages: number = 0;
  public hasPrevious: boolean = false;
  public hasNext: boolean = false;
}
