import { defineStore } from "pinia";
import { ref } from "vue";
import { IApiOrder } from "@/modules/order/types/api/IApiOrder";
import { IOrder } from "@/modules/order/types/IOrder";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import { useCartStore } from "@/modules/cart/cartStore";
import { orderApi } from "@/modules/order/orderApi";
import { mapApiOrdersToOrders } from "@/modules/order/helpers/orderMapper";

export const useOrderStore = defineStore("orderStore", () => {
  const pizzaStore = usePizzaStore();
  const cartStore = useCartStore();
  const orders = ref<IOrder[]>([]);
  const isLoading = ref<boolean>(false);

  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const apiOrders = await orderApi.getOrders();
      orders.value = mapApiOrdersToOrders(apiOrders as unknown as IApiOrder[], {
        sizes: pizzaStore.pizzaSizes,
        doughs: pizzaStore.pizzaDoughs,
        sauces: pizzaStore.sauces,
        ingredients: pizzaStore.ingredients,
        extras: cartStore.extras,
      });
    } finally {
      isLoading.value = false;
    }
  }

  function addOrder(payload: IOrder): void {
    orders.value.push(payload);
  }

  return { orders, addOrder, init, isLoading };
});
