import { defineStore } from "pinia";
import colaIcon from "@/assets/img/cola.svg";
import sauceIcon from "@/assets/img/sauce.svg";
import potatoIcon from "@/assets/img/potato.svg";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IAdditionalPizzaItem } from "@/modules/pizza/types/IAdditionalPizzaItem";
import { computed, ref } from "vue";
import { mapWithCount } from "@/helpers/mappers";
import { BaseDeliveryEnum } from "@/modules/cart/types/BaseDeliveryEnum";
import { useProfileStore } from "@/modules/profile/profileStore";
import { IOrder } from "@/modules/order/types/IOrder";
import { useOrderStore } from "@/modules/order/orderStore";

export const useCartStore = defineStore("cartStore", () => {
  const profileStore = useProfileStore();
  const orderStore = useOrderStore();

  const cartItems = ref<IPizzaItem[]>([]);

  const extras = ref<IAdditionalPizzaItem[]>(
    mapWithCount([
      {
        id: 1,
        image: colaIcon,
        name: "Coca-Cola 0,5 литра",
        price: 56,
        count: 2,
      },
      { id: 2, image: sauceIcon, name: "Острый соус", price: 30, count: 2 },
      {
        id: 3,
        image: potatoIcon,
        name: "Картошка из печи",
        price: 56,
        count: 2,
      },
    ]),
  );

  const currentDelivery = ref<string>("self");
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
  const userPhone = ref<string>(profileStore.user.phone);

  function orderPizzas() {
    const order: IOrder = {
      id: 1,
      pizzas: cartItems.value,
      extras: extras.value,
      address: null,
      deliveryType: currentDelivery.value,
      phone: userPhone.value,
      total: totalPrice.value,
    };

    switch (currentDelivery.value) {
      case BaseDeliveryEnum.new:
        order.address = profileStore.saveAddressFromForm();
        order.deliveryType = BaseDeliveryEnum.new;
        break;
      case BaseDeliveryEnum.self:
        break;
      default: {
        const selectedAddress = profileStore.addresses.find(
          (address) => address.id === parseFloat(currentDelivery.value),
        );
        if (selectedAddress) {
          order.address = selectedAddress;
        }

        break;
      }
    }
    orderStore.addOrder(order);
  }

  return {
    cartItems,
    extras,
    totalPrice,
    currentDelivery,
    userPhone,
    addPizzaItem,
    orderPizzas,
  };
});
