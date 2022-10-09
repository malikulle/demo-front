import ProductCommentPagination from "../../catalog/productComment/ProductCommentPagination";

export enum getProductCommentActionType {
    GET_COMMNET_LİST_SUCCESS = "GET_COMMNET_LİST_SUCCESS",
}

interface actionSuccess {
  type: getProductCommentActionType.GET_COMMNET_LİST_SUCCESS;
  payload: ProductCommentPagination;
}


export type getProductCommentAction = actionSuccess;
