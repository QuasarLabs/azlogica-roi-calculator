<script setup lang="ts">
import { MAINTENANCE_CONST } from "~/constants/MaintenanceConst";
import { UI_ELEMENTS } from "~/constants/uiElements";
import type { IMaintenance } from "~/types/Maintenance";

// Реактивные данные для хранения ответов
const values:IMaintenance = reactive({
  maintenanceCost: 0,
});

// Создание события для отправки данных
const emit = defineEmits(["update"]);
function change() {
  emit("update", "maintenanceOptimization", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "maintenanceOptimization", newValues); 
  },
  {
    immediate: true,
    deep: true, 
    once:true,
  }
);
</script>

<template>
  <section class="maintenance-management">
    <ol class="maintenance-management__list">
      <li
        class="maintenance-management__item"
        v-for="item in MAINTENANCE_CONST"
        :key="item.id"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.subtitle }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IMaintenance]"
          v-bind="item.props"
          @change="change"
        ></component>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">

.maintenance-management{
   margin-bottom: 16px;
   &__list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 24px;
    @media screen and (min-width: $sm) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 24px;
      column-gap: 50px;
    }
  }
  &__item {
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;

    @media screen and (min-width: $lg) {
      align-items: center;
      flex-direction: row;
    }
  }
}   
</style>