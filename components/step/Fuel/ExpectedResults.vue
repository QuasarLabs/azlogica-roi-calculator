<script setup lang="ts">
import { UI_ELEMENTS } from "~/constants/uiElements";
import type { IFuelManagementExpectedResults } from "~/types/FuelManagement";
import { FUEL_EXPECTED_CONST } from "~/constants/FuelConst";
// Реактивные данные для хранения ответов
const values:IFuelManagementExpectedResults = reactive({
  routeOptimization: 0, // Ожидаемая оптимизация маршрута (в %)
  habitSavings: 0, // Экономия за счет улучшения привычек (в %)
  consumptionControl: 0, // Ожидаемый контроль потребления (в %)
});

// Создание события для отправки данных
const emit = defineEmits(["update"]);
function change() {
  emit("update", "fuelManagement", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "fuelManagement", newValues);
  },
  {
    immediate: true,
    deep: true,
    once: true,
  }
);
</script>

<template>
  <section class="expected-results">
    <div class="expected-results__box">
      <span class="subtitle">Resultados productivos esperados</span>
    </div>
    <ol class="expected-results__list">
      <li
        class="expected-results__item"
        v-for="item in FUEL_EXPECTED_CONST"
        :key="item.id"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.subtitle }}</span>
          <p class="description" v-html="item.description"></p>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IFuelManagementExpectedResults]"
          v-bind="item.props"
          @change="change"
        />
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.expected-results {
  margin-bottom: 16px;
  border-top: 1px solid $white;
  padding-top: 16px;
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
