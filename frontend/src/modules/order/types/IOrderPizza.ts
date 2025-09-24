import { IOrderPizzaIngredient } from "@/modules/order/types/IOrderPizzaIngredient";

export interface IOrderPizza {
  id: number;
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  quantity: number;
  orderId: number;
  ingredients: IOrderPizzaIngredient[];
}
