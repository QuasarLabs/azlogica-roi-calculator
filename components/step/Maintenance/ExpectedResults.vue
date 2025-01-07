<script setup lang="ts">
import { UI_ELEMENTS } from "~/constants/uiElements";
import type {IMaintenanceExpectedResults} from '~/types/Maintenance'
import {MAINTENANCE_EXPECTED_CONST} from '~/constants/MaintenanceConst'
// Реактивные данные для хранения ответа
const values:IMaintenanceExpectedResults = reactive({
  costReduction: 0, // Снижение ожидаемых затрат на техническое обслуживание (в %)
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
<template >
<section class="expected-results">
  <div class="expected-results__box">
    <span class="subtitle">Resultados productivos esperados</span>
  </div>
  <ol class="expected-results__list">
    <li
      v-for="item in MAINTENANCE_EXPECTED_CONST"
      :key="item.id"
      class="expected-results__item">
      <div class="info">
        <strong class="subtitle">{{ item.title }}</strong>
        <span>{{ item.desc }}</span>
      </div>
      <component
        :is="UI_ELEMENTS[item.content]"
        v-model="values[item.model as keyof IMaintenanceExpectedResults]"
        v-bind="item.props"
        @change="change"
      />
    </li>
  </ol>
</section>
</template>
<style scoped lang="scss">
.maintenance-optimization {
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
