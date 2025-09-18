<template>
  <div :class="$style.wrapper">
    <sheet-component tag="form" :class="$style.form" @submit="onSubmit">
      <div :class="$style.header">
        <b>{{ title ?? "Адрес" }}</b>
      </div>

      <div :class="$style.body">
        <div :class="$style.input">
          <text-input
            v-model="model.name"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          >
            <span>Название адреса*</span>
          </text-input>
        </div>

        <div :class="[$style.input, $style.normal]">
          <text-input
            v-model="model.street"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          >
            <span>Улица*</span>
          </text-input>
        </div>

        <div :class="[$style.input, $style.small]">
          <text-input
            v-model="model.house"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          >
            <span>Дом*</span>
          </text-input>
        </div>

        <div :class="[$style.input, $style.small]">
          <text-input
            v-model="model.apartment"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          >
            <span>Квартира</span>
          </text-input>
        </div>

        <div :class="$style.input">
          <text-input
            v-model="model.comment"
            name="addr-comment"
            placeholder="Введите комментарий"
          >
            <span>Комментарий</span>
          </text-input>
        </div>
      </div>

      <div :class="$style.actions">
        <button-component
          type="button"
          variant="transparent"
          @click="$emit('remove')"
        >
          Удалить
        </button-component>
        <button-component type="submit" class="button">
          Сохранить
        </button-component>
      </div>
    </sheet-component>
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import SheetComponent from "@/common/components/SheetComponent.vue";

const model = defineModel<{
  name: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}>({
  default: { name: "", street: "", house: "", apartment: "", comment: "" },
});

defineProps<{ title?: string }>();
const emits = defineEmits<{ submit: [typeof model.value]; remove: [] }>();

function onSubmit(e: Event) {
  e.preventDefault();
  emits("submit", model.value);
}
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";

.wrapper {
  margin-top: 16px;
}

.form {
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
}

.header {
  @include ds-typography.b-s14-h16;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  padding: 16px;
}

.input {
  width: 100%;
  margin-bottom: 16px;
}
.normal {
  width: 60.5%;
}
.small {
  width: 18%;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  :global(button) {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
</style>
