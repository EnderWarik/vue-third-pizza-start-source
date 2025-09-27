<template>
  <div class="sign-form">
    <CloseButton inner-aria-label="Закрыть форму авторизации" white />

    <TitleComponent class="sign-form__title" tag="h1">
      Авторизуйтесь на сайте
    </TitleComponent>

    <form action="test.html" method="post">
      <FormLine>
        <TextInput
          v-model="email"
          name="email"
          type="email"
          placeholder="example@mail.ru"
        >
          <span>E-mail</span>
        </TextInput>
      </FormLine>

      <FormLine>
        <TextInput
          v-model="password"
          name="pass"
          type="password"
          placeholder="***********"
        >
          <span>Пароль</span>
        </TextInput>
      </FormLine>
      <ButtonComponent type="submit" @click="onLogin">
        Авторизоваться
      </ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import TextInput from "@/common/components/TextInput.vue";
import { ref } from "vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import CloseButton from "@/common/components/CloseButton.vue";
import FormLine from "@/modules/login/components/FormLine.vue";
import { useAuthStore } from "@/modules/login/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
function onLogin() {
  if (authStore.login(email.value, password.value)) {
    router.push("/");
  }
}
const email = ref("");
const password = ref("");
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";

.sign-form {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: ds-colors.$white url("@/assets/img/popup.svg") no-repeat center
    top;
  box-shadow: ds-shadows.$shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}
</style>
