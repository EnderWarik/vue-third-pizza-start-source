import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";
import { IPizzaDough } from "@/modules/pizza/types/IPizzaDough";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";

export type IPizzaItem = {
  id: string;
  name: string;
  size: IPizzaSize;
  dough: IPizzaDough;
  sauce: IPizzaSauce;
  fillings: IPizzaIngredient[] | [];
  count: number;
  price: number;
};
