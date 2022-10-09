import { Dispatch } from "redux";
import {
  getProductAction,
  getProductActionType,
} from "../../models/action/catalog/GetProductActionType";
import {
  getProductCommentAction,
  getProductCommentActionType,
} from "../../models/action/catalog/GetProductCommentActionType";
import Product from "../../models/catalog/product/Product";
import ProductComment from "../../models/catalog/productComment/ProductComment";
import Dynamic from "../../service/base/Dynamic";
import BaseService from "../../service/BaseService";

export const getProductList =
  (page: number = 1, lang: string = "", categoryID: number = 0) =>
  async (dispatch: Dispatch<getProductAction>) => {
    const service = new BaseService();
    try {
      const filter = new Product();
      filter.statusID = 1;
      filter.categoryID = categoryID;
      const dynamic = new Dynamic();
      dynamic.pageSize = 5;
      dynamic.page = page;
      const { data } = await service.Catalog.getProducts(filter, dynamic, lang);
      if (!data.hasFailed && data.data && data.data.items) {
        dispatch({
          type: getProductActionType.GET_LİST_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {}
  };

export const getProductCommentList =
  (page: number = 1) =>
  async (dispatch: Dispatch<getProductCommentAction>) => {
    const service = new BaseService();
    try {
      const filter = new ProductComment();
      const dynamic = new Dynamic();
      dynamic.pageSize = 5;
      dynamic.page = page;
      const { data } = await service.Catalog.getProductComments(
        filter,
        dynamic
      );
      if (!data.hasFailed && data.data) {
        dispatch({
          type: getProductCommentActionType.GET_COMMNET_LİST_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {}
  };
