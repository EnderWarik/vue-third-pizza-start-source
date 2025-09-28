import { defineStore } from "pinia";
import { ref } from "vue";
import { IOrder } from "@/modules/order/types/IOrder";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import { useCartStore } from "@/modules/cart/cartStore";
import { useProfileStore } from "@/modules/profile/profileStore";
import { orderApi } from "@/modules/order/orderApi";
import { mapApiOrdersToOrders } from "@/modules/order/helpers/orderMapper";

export const useOrderStore = defineStore("orderStore", () => {
  const pizzaStore = usePizzaStore();
  const cartStore = useCartStore();
  const profileStore = useProfileStore();
  const orders = ref<IOrder[]>([]);
  const isLoading = ref<boolean>(false);

  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const apiOrders = await orderApi.getOrders();
      const uid = profileStore.user?.id;
      const filtered = apiOrders.filter((o) => o.userId === uid);
      orders.value = mapApiOrdersToOrders(filtered, {
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

  async function deleteOrder(id: number): Promise<void> {
    await orderApi.deleteOrder(id);
    orders.value = orders.value.filter((o) => o.id !== id);
  }

  return { orders, addOrder, init, isLoading, deleteOrder };
});
