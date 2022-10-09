import ProductPagination from "../../catalog/product/ProductPagination";

export enum getProductActionType {
  GET_LİST_SUCCESS = "GET_LİST_SUCCESS",
}

interface actionSuccess {
  type: getProductActionType.GET_LİST_SUCCESS;
  payload: ProductPagination;
}

export type getProductAction = actionSuccess;
