<script lang="ts" setup></script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <BaseLogo />
        <h1 class="title_large">
          Calculadora de ROI para proyectos de IoT + AI
        </h1>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
.header {
  padding: 10px 0;
  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    text-align: center;
  }
}
</style>
