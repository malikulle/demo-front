import {
  getProductAction,
  getProductActionType,
} from "../../models/action/catalog/GetProductActionType";
import ProductPagination from "../../models/catalog/product/ProductPagination";
import initialState from "../initialState";

interface State {
  productList: ProductPagination;
}

export const productListReducer = (
  state: State = initialState,
  action: getProductAction
): State => {
  switch (action.type) {
    case getProductActionType.GET_LİST_SUCCESS:
      return {
        productList: action.payload,
      };
    default:
      return state;
  }
};
