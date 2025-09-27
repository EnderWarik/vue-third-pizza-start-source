<template>
  <div class="container">
    <TitleComponent :class="$style.title" tag="h1"> Корзина </TitleComponent>

    <CartList :items="cartStore.cartItems" />

    <AdditionalList :class="$style.additional" :items="cartStore.extras" />

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

const cartStore = useCartStore();

const profileStore = useProfileStore();
</script>

<style module lang="scss">
@use "@/assets/scss/mixins/m_clear-list";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

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
