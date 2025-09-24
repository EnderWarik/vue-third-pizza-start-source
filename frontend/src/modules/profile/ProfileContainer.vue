<script setup lang="ts">
import UserInfo from "@/modules/profile/components/UserInfo.vue";
import AddressCard from "@/modules/profile/components/AddressCard.vue";
import AddressForm from "@/modules/profile/components/AddressForm.vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import { makeAvatar } from "@/modules/profile/helpers/img-helpers";

const user = {
  name: "Василий Ложкин",
  phone: "+7 999-999-99-99",
  avatar: makeAvatar("user5"),
};

const formModel = {
  name: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
};

function saveAddress(payload: typeof formModel) {
  console.log(payload);
}
function removeAddress() {
  console.log("remove");
}
function editAddress() {
  console.log("edit");
}
</script>

<template>
  <UserInfo :name="user.name" :phone="user.phone" :avatar="user.avatar" />

  <AddressCard
    title="Адрес №1. Тест"
    address="Невский пр., д. 22, кв. 46"
    note="Позвоните, пожалуйста, от проходной"
    @edit="editAddress"
  />

  <AddressForm
    v-model="formModel"
    title="Адрес №1"
    @submit="saveAddress"
    @remove="removeAddress"
  />

  <div style="margin-top: 16px">
    <ButtonComponent type="button" variant="border">
      Добавить новый адрес
    </ButtonComponent>
  </div>
</template>
