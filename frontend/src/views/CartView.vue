<script setup lang="ts">
import CartContainer from "@/modules/cart/CartContainer.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
</script>

<template>
  <form action="test.html" method="post" class="layout-form">
    <main :class="[$style.content, $style.cart]">
      <cart-container />
    </main>
    <cart-footer :total="123" @more="() => {}" @submit="() => {}" />
  </form>
</template>

<style module lang="scss">
.content {
  padding-top: 20px;
}
.cart {
  margin-right: 10px;
  margin-left: auto;
}
</style>
