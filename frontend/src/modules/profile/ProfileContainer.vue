<template>
  <UserInfo
    :name="profileStore.user.name"
    :phone="profileStore.user.phone"
    :avatar="profileStore.user.avatar"
  />

  <template v-for="address in profileStore.addresses" :key="address.id">
    <AddressLine
      :address="address"
      :is-open="openId === address.id"
      form-title="Изменить адрес"
      @edit="openEdit"
      @save="saveAddress"
      @remove="removeAddress"
      @cancel="closeEditor"
    />
  </template>

  <AddressForm
    v-if="openId === -1"
    v-model="newDraft"
    :is-new="true"
    title="Новый адрес"
    @submit="saveAddress({ id: null, form: newDraft })"
    @cancel="closeEditor"
  />

  <div>
    <ButtonComponent type="button" variant="border" @click="openNew"
      >Добавить новый адрес</ButtonComponent
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProfileStore } from "@/modules/profile/profileStore";
import AddressLine from "@/modules/profile/components/AddressLine.vue";
import UserInfo from "@/modules/profile/components/UserInfo.vue";
import AddressForm from "@/modules/profile/components/AddressForm.vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import { AddressDraftType } from "@/modules/profile/types/AddressDraftType";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";

const profileStore = useProfileStore();

const openId = ref<number | null>(null);

const newDraft = ref<AddressDraftType>(profileStore.addressForm);

function openEdit(id: number) {
  openId.value = id;
}

function openNew() {
  profileStore.clearAddressForm();
  newDraft.value = profileStore.addressForm;
  openId.value = -1;
}

function closeEditor() {
  openId.value = null;
  profileStore.clearAddressForm();
  newDraft.value = profileStore.addressForm;
}

function saveAddress(payload: { id: number | null; form: AddressDraftType }) {
  const { id, form } = payload;

  if (id == null) {
    const nextId = getNextId(profileStore.addresses);
    const created: IUserAddress = { ...form, id: nextId } as IUserAddress;
    profileStore.addresses = [...profileStore.addresses, created];
  } else {
    profileStore.addresses = profileStore.addresses.map((a) =>
      a.id === id ? ({ ...a, ...form, id } satisfies IUserAddress) : a,
    );
  }
  closeEditor();
}

function removeAddress(id: number) {
  profileStore.addresses = profileStore.addresses.filter((a) => a.id !== id);
  closeEditor();
}

function getNextId(items: IUserAddress[]): number {
  return (items.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1;
}
</script>
