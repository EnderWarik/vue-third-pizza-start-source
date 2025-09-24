import { IOrderMisc } from "@/modules/order/types/IOrderMisc";
import { IOrderPizza } from "@/modules/order/types/IOrderPizza";
import { IOrderAddress } from "@/modules/order/types/IOrderAddress";

export interface IOrder {
  id: number;
  userId: string;
  addressId: number;
  orderPizzas: IOrderPizza[];
  orderMisc: IOrderMisc[];
  orderAddress: IOrderAddress;
}
