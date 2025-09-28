<template>
  <div class="sign-form">
    <CloseButton inner-aria-label="Закрыть форму авторизации" white />

    <TitleComponent class="sign-form__title" tag="h1">
      Авторизуйтесь на сайте
    </TitleComponent>

    <form novalidate @submit.prevent="onLogin">
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

      <ButtonComponent type="submit" :disabled="loading">
        {{ loading ? "Авторизация..." : "Авторизоваться" }}
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
import FormLine from "@/modules/auth/components/FormLine.vue";
import { useAuthStore } from "@/modules/auth/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(): string | null {
  const e = email.value.trim();
  const p = password.value;

  if (!e) return "Введите e-mail.";
  if (!emailRe.test(e)) return "Некорректный e-mail.";
  if (!p) return "Введите пароль.";
  if (p.length < 8) return "Пароль должен быть не короче 8 символов.";

  return null;
}

async function onLogin() {
  const err = validate();
  if (err) {
    alert(err);
    return;
  }

  if (loading.value) return;
  loading.value = true;
  try {
    const ok = await authStore.login(email.value.trim(), password.value);
    if (ok) {
      await router.push("/");
    } else {
      alert("Неверный e-mail или пароль.");
    }
  } catch (e) {
    console.error(e);
    alert("Ошибка входа. Попробуйте ещё раз.");
  } finally {
    loading.value = false;
  }
}
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
  padding: 146px 32px 32px;
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
