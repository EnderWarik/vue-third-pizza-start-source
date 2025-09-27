import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";

export type IApiExtraResponse = Omit<IAdditionalCartItem, "count">;
