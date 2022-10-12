import {
  getCurrentUserAction,
  getCurrentUserBasketActionType,
} from "../../models/action/sales/GetCurrentUserBasket";
import Basket from "../../models/sales/basket/Basket";
import initialState from "../initialState";

interface State {
  currentUserBasket: Basket;
}

export const currentUserBasketReducer = (
  state: State = initialState,
  action: getCurrentUserAction
): State => {
  switch (action.type) {
    case getCurrentUserBasketActionType.GET_USER_BASKET_SUCCESS:
      return {
        currentUserBasket: action.payload,
      };
    case getCurrentUserBasketActionType.UPDATE_BASKET:
      return {
        currentUserBasket: action.payload,
      };
    default:
      return state;
  }
};
