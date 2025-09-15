<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <title-component size="big" tag="h1">Конструктор пиццы</title-component>

        <dough-selector />
        <size-selector />
        <ingredients-selector />
        <!--        <content-pizza></content-pizza>-->
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import DoughSelector from "@/modules/constructor/dough/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/size/SizeSelector.vue";
import IngredientsSelector from "@/modules/constructor/ingredient/IngredientsSelector.vue";
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-typography";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}
</style>
