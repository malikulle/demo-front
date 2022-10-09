import {
  getProductCommentAction,
  getProductCommentActionType,
} from "../../models/action/catalog/GetProductCommentActionType";
import ProductCommentPagination from "../../models/catalog/productComment/ProductCommentPagination";
import initialState from "../initialState";

interface State {
  productCommentList: ProductCommentPagination;
}

export const productCommentListReducer = (
  state: State = initialState,
  action: getProductCommentAction
): State => {
  switch (action.type) {
    case getProductCommentActionType.GET_COMMNET_LİST_SUCCESS:
      return {
        productCommentList: action.payload,
      };
    default:
      return state;
  }
};
