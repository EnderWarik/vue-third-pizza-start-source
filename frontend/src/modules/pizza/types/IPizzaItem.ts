import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";
import { IPizzaDough } from "@/types/interfaces/IPizzaDough";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";

export type IPizzaItem = {
  id: string;
  name: string;
  size: IPizzaSize | null;
  dough: IPizzaDough | null;
  sauce: IPizzaSauce | null;
  fillings: IPizzaIngredient[] | [];
  count: number;
  price: number;
};
