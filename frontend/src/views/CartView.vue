<template>
  <form class="layout-form" @submit.prevent>
    <main :class="[$style.content, $style.cart]">
      <CartContainer />
    </main>
    <CartFooter
      :total="cartStore.totalPrice"
      @more="router.push('/')"
      @submit="onSubmitCart"
    />
    <OrderThanksModal v-model="isThanksOpen" />
  </form>
</template>
<script setup lang="ts">
import CartContainer from "@/modules/cart/CartContainer.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import OrderThanksModal from "@/modules/cart/components/OrderThanksModal.vue";
import { useCartStore } from "@/modules/cart/cartStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const cartStore = useCartStore();

const router = useRouter();
const isThanksOpen = ref(false);

function onSubmitCart() {
  cartStore.orderPizzas().then(() => {
    isThanksOpen.value = true;
  });
}
</script>

<style module lang="scss">
.content {
  padding-top: 20px;
}
.cart {
  margin-right: 10px;
  margin-left: auto;
}
</style>
