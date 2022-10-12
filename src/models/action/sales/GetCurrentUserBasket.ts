import Basket from "../../sales/basket/Basket";

export enum getCurrentUserBasketActionType {
  GET_USER_BASKET_SUCCESS = "GET_USER_BASKET_SUCCESS",
  UPDATE_BASKET = "UPDATE_BASKET",
}

interface actionSuccess {
  type: getCurrentUserBasketActionType.GET_USER_BASKET_SUCCESS;
  payload: Basket;
}


interface actionUpdate {
  type: getCurrentUserBasketActionType.UPDATE_BASKET;
  payload: Basket;
}
export type getCurrentUserAction = actionSuccess | actionUpdate;
