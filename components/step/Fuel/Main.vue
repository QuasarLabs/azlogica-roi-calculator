<script setup lang="ts">
import { UI_ELEMENTS } from "~/constants/uiElements";
import { FUEL_CONST } from "~/constants/FuelConst";
import type { IFuelManagement } from "~/types/FuelManagement";
// Реактивные данные для хранения ответов
const values: IFuelManagement = reactive({
  fuelEconomy: 0, // Экономия топлива (в км на галлон)
  fuelPrice: 0, // Цена топлива за галлон
  routeDistance: 0, // Пройденное расстояние по маршрутам
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
    once:true,
  }
);
</script>

<template>
  <section class="fuel">
    <ol class="fuel__list">
      <li v-for="item in FUEL_CONST" :key="item.id" class="fuel__item">
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IFuelManagement]"
          v-bind="item.props"
          @change="change"
        >
        <template #prefix v-if="item.props.prefix">
         {{item.props.prefix}}
        </template>
        </component>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.fuel {
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
