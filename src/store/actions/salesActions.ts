import { Dispatch } from "redux";
import {
  getCurrentUserAction,
  getCurrentUserBasketActionType,
} from "../../models/action/sales/GetCurrentUserBasket";
import Basket from "../../models/sales/basket/Basket";
import BaseService from "../../service/BaseService";

export const getCurrentUserBasket =
  () => async (dispatch: Dispatch<getCurrentUserAction>) => {
    try {
      const service = new BaseService();
      if (service.Authentication.isAuthenticate()) {
        const { data } = await service.Sales.getCurrentUserBasket();
        if (data.data) {
          dispatch({
            type: getCurrentUserBasketActionType.GET_USER_BASKET_SUCCESS,
            payload: data.data,
          });
        }
      }
    } catch (error) {}
  };

export const updateBasket =
  (payload: Basket) => async (dispatch: Dispatch<getCurrentUserAction>) => {
    try {
      dispatch({
        type: getCurrentUserBasketActionType.UPDATE_BASKET,
        payload: payload,
      });
    } catch (error) {}
  };
