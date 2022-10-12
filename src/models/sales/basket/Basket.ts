import BasketItem from "../basketItem/BasketItem";
import { BasketStatus } from "../enum/BasketStatus";
import { PaymentMethod } from "../enum/PaymentMethod";

export default class Basket {
  id: number = 0;
  userID: number = 0;
  paymentMethod: PaymentMethod = PaymentMethod.None;
  basketStatus: BasketStatus = BasketStatus.None;
  totalPrice: number = 0;
  basketPrice: number = 0;
  taxPrice: number = 0;
  shippingPrice: number = 0;
  basketItems: BasketItem[] = [];
}
