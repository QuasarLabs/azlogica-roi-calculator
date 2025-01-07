<script lang="ts" setup></script>

<template>
  <NuxtLink class="logo-link" to="/">
    <img src="/public/logo.png" alt="azlogica logo" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo-link {
  display: inline-block;
  width: 200px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
