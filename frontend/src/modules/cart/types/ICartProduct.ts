import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalPizzaItem } from "@/modules/pizza/types/IAdditionalPizzaItem";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

export interface ICartProduct {
  userId: string;
  addressId: number | null;
  orderPizzas: IPizzaItem[];
  orderMisc: IAdditionalPizzaItem[];
  orderAddress: IUserAddress;
}
