<script setup lang="ts">
import { INVENTORY_EXPECTED_CONST } from "~/constants/InventoryManagement";
import { UI_ELEMENTS } from "~/constants/uiElements";
import type { IInventoryManagementExpectedResults } from "~/types/inventoryManagement";

const emit = defineEmits(["update"]);

// ✅ Безопасный парсер
function safeNumber(value: any): number {
  const num = Number(value);
  return !isFinite(num) || isNaN(num) ? 0 : num;
}

// 📦 Инициализация реактивного объекта
const values: IInventoryManagementExpectedResults = reactive({
  warehouseReduction: 0,
  forecastAccuracy: 0,
});

// ✅ Обновление данных вручную при изменении одного поля
function change() {
  for (const key in values) {
    values[key as keyof IInventoryManagementExpectedResults] = safeNumber(
      values[key as keyof IInventoryManagementExpectedResults]
    );
  }
  emit("update", "inventoryManagement", { ...values });
}

// ✅ Наблюдатель с безопасной трансформацией данных
watch(
  () => values,
  (newValues) => {
    for (const key in newValues) {
      newValues[key as keyof IInventoryManagementExpectedResults] = safeNumber(
        newValues[key as keyof IInventoryManagementExpectedResults]
      );
    }
    emit("update", "inventoryManagement", { ...newValues });
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
        v-for="item in INVENTORY_EXPECTED_CONST"
        :key="item.id"
        class="expected-results__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IInventoryManagementExpectedResults]"
          v-bind="item.props"
          @change="change"
        >
          <template #prefix v-if="item.props.prefix">
            {{ item.props.prefix }}
          </template>
        </component>
      </li>
    </ol>
  </section>
</template>


<style scoped lang="scss">
.inventory-control {
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
