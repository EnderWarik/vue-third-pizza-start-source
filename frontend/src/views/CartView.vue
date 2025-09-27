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
  </form>
</template>
<script setup lang="ts">
import CartContainer from "@/modules/cart/CartContainer.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import { useCartStore } from "@/modules/cart/cartStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();

const router = useRouter();

function onSubmitCart() {
  cartStore.orderPizzas();
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
