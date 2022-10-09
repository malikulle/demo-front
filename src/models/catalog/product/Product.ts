import { Category } from "../category/Category";
import Product_i18n from "./Product_i18n";

export default class Product {
  id: number = 0;
  statusID: number = 0;
  name: string = "";
  description: string = "";
  imagePath: string = "";
  price: number = 0;
  categoryName: string = "";
  categoryID?: number;
  category: Category = new Category();

  categoryIDs: number[] = [];
  product_i18n: Product_i18n[] = [];
}
