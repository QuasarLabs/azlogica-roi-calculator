<script lang="ts" setup></script>

<template>
  <div class="layout_default azlogica">
    <TheHeader />
    <main class="main azlogica">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
<style lang="scss" scoped>
.layout_default {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 0 0 24px 0;
}
// .layout_default:has(.error) {
//   background-color: $white;
//   .footer {
//     display: none !important;
//   }
// }
</style>
