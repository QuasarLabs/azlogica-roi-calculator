<script setup lang="ts">
interface Props {
  icon: string;
  size?: string;
}

withDefaults(defineProps<Props>(), {
  size: "24px",
});
</script>

<template>
  <svg  :width="size" aria-hidden="true" :height="size">
    <use :xlink:href="`/icons-sprite.svg#${icon}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
svg {
  color: inherit;
}
</style>
