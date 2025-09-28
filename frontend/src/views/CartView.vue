<template>
  <form :class="$style.layoutForm" @submit.prevent>
    <main class="wrapper" :class="[$style.content]">
      <CartContainer />
    </main>
    <CartFooter
      :total="cartStore.totalPrice"
      :disabled="isSubmitDisabled"
      @more="router.push('/')"
      @submit="onSubmitCart"
    />
    <OrderThanksModal v-model="isThanksOpen" @close="onClose" />
  </form>
</template>
<script setup lang="ts">
import CartContainer from "@/modules/cart/CartContainer.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import OrderThanksModal from "@/modules/cart/components/OrderThanksModal.vue";
import { useCartStore } from "@/modules/cart/cartStore";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useProfileStore } from "@/modules/profile/profileStore";
import { useAuthStore } from "@/modules/auth/authStore";
import { BaseDeliveryEnum } from "@/modules/cart/types/BaseDeliveryEnum";
import { usePizzaStore } from "@/modules/pizza/pizzaStore";

const cartStore = useCartStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const pizzaStore = usePizzaStore();
const router = useRouter();
const isThanksOpen = ref(false);
const isSubmitDisabled = computed(() => {
  if (cartStore.currentDelivery === BaseDeliveryEnum.self)
    return !cartStore.userPhone?.trim();
  return (
    !cartStore.userPhone?.trim() ||
    !profileStore.addressForm.street?.trim() ||
    !profileStore.addressForm.building?.trim()
  );
});

function onSubmitCart() {
  cartStore.orderPizzas().then(() => {
    isThanksOpen.value = true;
  });
}

function onClose() {
  pizzaStore.resetCurrentPizza();
  cartStore.resetCart();
  if (authStore.isAuthenticated) {
    router.push("/orders");
  } else {
    router.push("/");
  }
}
</script>

<style module lang="scss">
.content {
  padding-top: 20px;
  flex: 1 1 auto;
}
.layoutForm {
  min-height: calc(100vh - 61px);
  display: flex;
  flex-direction: column;
}
</style>
