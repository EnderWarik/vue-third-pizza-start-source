import { defineStore } from "pinia";
import { ref } from "vue";
import { IApiOrder } from "@/modules/order/types/api/IApiOrder";
import { IOrder } from "@/modules/order/types/IOrder";
import { mapApiOrdersToOrders } from "@/modules/order/helpers/orderMapper";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import { useCartStore } from "@/modules/cart/cartStore";

export const useOrderStore = defineStore("orderStore", () => {
  const pizzaStore = usePizzaStore();
  const cartStore = useCartStore();
  const orders = ref<IOrder[]>(
    mapApiOrdersToOrders(
      [
        {
          id: 1,
          userId: "1",
          addressId: 0,
          orderPizzas: [
            {
              id: 2,
              name: "string",
              sauceId: 0,
              doughId: 0,
              sizeId: 0,
              quantity: 0,
              orderId: 0,
              ingredients: [
                {
                  id: 0,
                  pizzaId: 0,
                  ingredientId: 0,
                  quantity: 0,
                },
              ],
            },
          ],
          orderMisc: [
            {
              id: 0,
              orderId: 0,
              miscId: 0,
              quantity: 0,
            },
          ],
          orderAddress: {
            id: 0,
            name: "string",
            street: "string",
            building: "string",
            flat: "string",
            comment: "string",
            userId: "1",
          },
        },
      ],
      {
        sizes: pizzaStore.pizzaSizes,
        doughs: pizzaStore.pizzaDoughs,
        sauces: pizzaStore.sauces,
        ingredients: pizzaStore.ingredients,
        extras: cartStore.extras,
      },
    ),
  );

  function getOrders(): IApiOrder[] {}

  function postOrder(payload: IApiOrder): IApiOrder {}

  function deleteOrder(id: number): boolean {}

  function addOrder(payload: IOrder): void {
    orders.value.push(payload);
  }

  return { orders, addOrder };
});
