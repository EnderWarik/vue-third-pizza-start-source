<template>
  <div :class="$style.cartContainer">
    <TitleComponent :class="$style.title" tag="h1"> Корзина </TitleComponent>

    <CartList :items="cartStore.cartItems" @edit="onEdit" />

    <div v-if="cartStore.isLoadingExtras" class="$style.empty">
      Загрузка товаров...
    </div>
    <AdditionalList
      v-else
      :class="$style.additional"
      :items="cartStore.extras"
    />

    <CartForm
      v-model:delivery="cartStore.currentDelivery"
      v-model:street="profileStore.addressForm.street"
      v-model:house="profileStore.addressForm.building"
      v-model:apartment="profileStore.addressForm.flat"
      v-model:phone="cartStore.userPhone"
      :addresses="profileStore.addresses"
    />
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import AdditionalList from "@/modules/cart/components/AdditionalList.vue";
import { useCartStore } from "@/modules/cart/cartStore";
import { useProfileStore } from "@/modules/profile/profileStore";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";
import router from "@/router";

const cartStore = useCartStore();

const profileStore = useProfileStore();
const pizzaStore = usePizzaStore();

function onEdit(id: string) {
  const item = cartStore.cartItems.find((i) => i.id === id);
  if (!item) return;
  pizzaStore.loadFromCart(item);
  router.push("/");
}
</script>

<style module lang="scss">
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.cartContainer {
  width: 100%;
}
.title {
  margin-bottom: 15px;
}

.additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.empty {
  padding: 20px 30px;
}
</style>
