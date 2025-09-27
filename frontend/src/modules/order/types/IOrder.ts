import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalPizzaItem } from "@/modules/pizza/types/IAdditionalPizzaItem";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export interface IOrder {
  id: number;
  pizzas: IPizzaItem[];
  extras: IAdditionalPizzaItem[];
  address: IUserAddress | null;
  deliveryType: string;
  phone: string;
  total: number;
}
