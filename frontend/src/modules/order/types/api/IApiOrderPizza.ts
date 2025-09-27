import { IApiOrderPizzaIngredient } from "@/modules/order/types/api/IApiOrderPizzaIngredient";

export interface IApiOrderPizza {
  id: number;
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  quantity: number;
  orderId: number;
  ingredients: IApiOrderPizzaIngredient[];
}
