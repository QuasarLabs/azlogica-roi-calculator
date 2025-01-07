<script lang="ts" setup></script>

<template>
  <div class="layout_default">
    <TheHeader />
    <main class="main azlogica">
      <slot />
    </main>
    <!-- <TheFooter :is-show="isHeaderFooterShow" /> -->
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
  padding: 74px 0;
}
// .layout_default:has(.error) {
//   background-color: $white;
//   .footer {
//     display: none !important;
//   }
// }
</style>
