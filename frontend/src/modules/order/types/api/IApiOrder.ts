import { IApiOrderMisc } from "@/modules/order/types/api/IApiOrderMisc";
import { IApiOrderPizza } from "@/modules/order/types/api/IApiOrderPizza";
import { IApiOrderAddress } from "@/modules/order/types/api/IApiOrderAddress";

export interface IApiOrder {
  id: number;
  userId: string;
  addressId: number;
  orderPizzas: IApiOrderPizza[];
  orderMisc: IApiOrderMisc[];
  orderAddress: IApiOrderAddress;
}
