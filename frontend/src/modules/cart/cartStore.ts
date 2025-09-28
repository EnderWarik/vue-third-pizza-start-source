import { defineStore } from "pinia";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";
import { computed, ref } from "vue";
import { mapWithCount } from "@/helpers/mappers";
import { BaseDeliveryEnum } from "@/modules/cart/types/BaseDeliveryEnum";
import { useProfileStore } from "@/modules/profile/profileStore";
import { useOrderStore } from "@/modules/order/orderStore";
import { cartApi } from "@/modules/cart/cartApi";
import { orderApi } from "@/modules/order/orderApi";

export const useCartStore = defineStore("cartStore", () => {
  const profileStore = useProfileStore();
  const orderStore = useOrderStore();

  const cartItems = ref<IPizzaItem[]>([]);
  const isLoadingExtras = ref<boolean>(false);
  const extras = ref<IAdditionalCartItem[]>([]);

  const currentDelivery = ref<string>(BaseDeliveryEnum.new);
  const totalPrice = computed(() => {
    let result = 0;
    cartItems.value.forEach((item) => (result += item.price * item.count));

    extras.value.forEach((item) => (result += item.price * item.count));

    console.log(result);
    return result;
  });

  function addPizzaItem(item: IPizzaItem) {
    cartItems.value.push(item);
  }
  const userPhone = ref<string>(profileStore.user?.phone || "");

  async function init(): Promise<void> {
    try {
      isLoadingExtras.value = true;
      const extrasResp = await cartApi.getExtras();
      console.log(extrasResp);
      extras.value = mapWithCount(extrasResp).map((item) => ({
        ...item,
        count: 0,
      }));
    } finally {
      isLoadingExtras.value = false;
    }
  }

  async function orderPizzas() {
    if (!profileStore.user?.id) throw new Error("userId is required");
    const userId = profileStore.user.id;

    let addressPayload = null;
    if (currentDelivery.value === BaseDeliveryEnum.new) {
      const form = profileStore.addressForm;
      addressPayload = {
        street: form.street,
        building: form.building,
        flat: form.flat || "",
        comment: form.comment || "",
      };
    } else {
      const selectedAddress = profileStore.addresses.find(
        (address) => address.id === parseFloat(currentDelivery.value),
      );
      if (selectedAddress) {
        addressPayload = { id: selectedAddress.id } as any;
      }
    }

    const pizzasPayload = cartItems.value.map((p) => ({
      name: p.name,
      sauceId: p.sauce?.id ?? 0,
      doughId: p.dough?.id ?? 0,
      sizeId: p.size?.id ?? 0,
      quantity: p.count,
      ingredients: p.fillings.map((f) => ({
        ingredientId: f.id,
        quantity: f.count,
      })),
    }));

    const miscPayload = extras.value
      .filter((e) => e.count > 0)
      .map((e) => ({ miscId: e.id, quantity: e.count }));

    await orderApi.createOrder({
      userId,
      phone: userPhone.value,
      address: addressPayload,
      pizzas: pizzasPayload,
      misc: miscPayload,
    });

    cartItems.value = [];
    extras.value = extras.value.map((e) => ({ ...e, count: 0 }));
    await orderStore.init();
  }

  return {
    cartItems,
    extras,
    totalPrice,
    currentDelivery,
    userPhone,
    addPizzaItem,
    orderPizzas,
    isLoadingExtras,
    init,
  };
});
