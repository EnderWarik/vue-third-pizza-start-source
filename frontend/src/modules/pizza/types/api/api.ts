import { IPizzaDough } from "@/modules/pizza/types/IPizzaDough";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";
import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";

export type IApiPizzaDoughResponse = IPizzaDough[];

export type IApiPizzaIngredientResponse = IPizzaIngredient[];

export type IApiPizzaSaucesResponse = IPizzaSauce[];

export type IPizzaSizeResponse = IPizzaSize[];
