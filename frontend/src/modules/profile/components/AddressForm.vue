<template>
  <form :class="$style.form" @submit.prevent="emits('submit')">
    <div :class="$style.header">
      <b>{{ title ?? "Адрес" }}</b>
    </div>

    <div :class="$style.body">
      <TextInput
        v-model="model.name"
        name="addr-name"
        placeholder="Название"
        required
      >
        <span>Название адреса*</span>
      </TextInput>

      <div :class="$style.row">
        <div :class="[$style.input, $style.normal]">
          <TextInput
            v-model="model.street"
            name="addr-street"
            placeholder="Улица"
            required
          >
            <span>Улица*</span>
          </TextInput>
        </div>
        <div :class="[$style.input, $style.small]">
          <TextInput
            v-model="model.building"
            name="addr-building"
            placeholder="Дом"
            required
          >
            <span>Дом*</span>
          </TextInput>
        </div>
        <div :class="[$style.input, $style.small]">
          <TextInput
            v-model="model.flat"
            name="addr-flat"
            placeholder="Кв. (необязательно)"
          >
            <span>Квартира</span>
          </TextInput>
        </div>
      </div>

      <TextInput
        v-model="model.comment"
        name="addr-comment"
        placeholder="Введите комментарий"
      >
        <span>Комментарий</span>
      </TextInput>
    </div>

    <div :class="$style.actions">
      <ButtonComponent type="submit">Сохранить</ButtonComponent>
      <ButtonComponent type="button" variant="border" @click="emits('cancel')"
        >Отмена</ButtonComponent
      >
      <ButtonComponent v-if="!isNew" type="button" @click="emits('remove')">
        Удалить
      </ButtonComponent>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import TextInput from "@/common/components/TextInput.vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";

import { AddressDraftType } from "@/modules/profile/types/draft";

const { title = "Адрес", isNew = false } = defineProps<{
  title?: string;
  isNew?: boolean;
}>();

const emits = defineEmits<{
  (e: "submit"): void;
  (e: "cancel"): void;
  (e: "remove"): void;
}>();

const model = defineModel<AddressDraftType>({ required: true });
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
  display: block;
  padding: 16px;
}

.input {
  width: 100%;
  margin-bottom: 16px;
}
.row {
  display: flex;
  gap: 16px;
}
.normal {
  flex: 1 1 60.5%;
}
.small {
  flex: 0 0 18%;
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
