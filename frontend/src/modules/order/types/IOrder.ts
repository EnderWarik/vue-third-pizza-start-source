import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export interface IOrder {
  id: number;
  pizzas: IPizzaItem[];
  extras: IAdditionalCartItem[];
  address: IUserAddress | null;
  deliveryType: string;
  phone: string;
  total: number;
}
