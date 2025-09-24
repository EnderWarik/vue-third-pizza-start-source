import { defineStore } from "pinia";
import { ref } from "vue";
import { IOrder } from "@/modules/order/types/IOrder";

const orderStore = defineStore("orderStore", () => {
  const orders = ref<IOrder[]>({
    id: 1,
    userId: "string",
    phone: "+7 999-999-99-99",
    address: {
      street: "string",
      building: "string",
      flat: "string",
      comment: "string",
    },
    pizzas: [
      {
        name: "string",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        quantity: 0,
        ingredients: [
          {
            ingredientId: 0,
            quantity: 0,
          },
        ],
      },
    ],
    misc: [
      {
        miscId: 0,
        quantity: 0,
      },
    ],
  });

  function getOrders(): IOrder[] {}

  function postOrder(payload: IOrder): IOrder {}

  function deleteOrder(id: number): boolean {}
});
