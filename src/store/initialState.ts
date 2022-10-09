import ProductPagination from "../models/catalog/product/ProductPagination";
import ProductCommentPagination from "../models/catalog/productComment/ProductCommentPagination";
import LocalStrorageService from "../service/localStorageService";

var localStorageService = new LocalStrorageService();

const userLogin = localStorageService.getUser();
const lang = localStorageService.getLanguageName();

const initialState = {
  userLogin: userLogin,
  language: lang,
  breadcrumbs: [],
  productList: new ProductPagination(),
  productCommentList : new ProductCommentPagination()
};

export default initialState;
