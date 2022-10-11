import Basket from "../models/sales/basket/Basket";
import BasketItem from "../models/sales/basketItem/BasketItem";
import HttpClient from "./base/HttpClient";
import { ServiceObjectResult } from "./base/serviceObjectResult";
import WebApiObjectRequest from "./base/WebApiObjectRequest";

export default class SalesService {
  private http = new HttpClient("Sales");

  getCurrentUserBasket() {
    const request = new WebApiObjectRequest<Basket>();
    return this.http.Post<ServiceObjectResult<Basket>>(
      "GetCurrentUserBasket",
      request
    );
  }

  addToBasket(quantity: number, productID: number, basketID: number = 0) {
    const basketItem = new BasketItem();
    basketItem.quantity = quantity;
    basketItem.productID = productID;
    basketItem.basketID = basketID;
    const request = new WebApiObjectRequest<BasketItem>();
    request.data = basketItem;
    return this.http.Post<ServiceObjectResult<Basket>>("AddToBasket", request);
  }
}
