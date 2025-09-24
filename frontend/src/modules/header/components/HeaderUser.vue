<template>
  <div :class="$style.user">
    <!--    v-if="!props.user"-->
    <router-link to="/login" :class="$style.login">
      <span>Войти</span>
    </router-link>

    <!--    <a v-else href="#" :class="$style.logout">-->
    <!--      <img :src="props.user.avatar" :alt="props.user.name" />-->
    <!--      <span>{{ props.user.name }}</span>-->
    <!--    </a>-->
  </div>
</template>

<script setup lang="ts">
// defineProps<{
//   user?: {
//     name: string;
//     avatar: string;
//   };
// }>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.user {
  display: flex;
  align-items: center;

  a {
    display: block;
    padding: 14px 20px;

    transition: 0.3s;
    background-color: ds-colors.$green-500;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;
    border-radius: 50%;
  }

  span {
    @include ds-typography.r-s14-h16;

    display: inline-block;
    vertical-align: middle;
    color: ds-colors.$white;
  }
}

.login {
  &::after {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.logout {
  &::before {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
