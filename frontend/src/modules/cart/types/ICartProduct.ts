import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export interface ICartProduct {
  userId: string;
  addressId: number | null;
  orderPizzas: IPizzaItem[];
  orderMisc: IAdditionalCartItem[];
  orderAddress: IUserAddress;
}
