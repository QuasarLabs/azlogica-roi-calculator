<script setup lang="ts">
import type { IInventoryManagement } from "~/types/inventoryManagement";
import { UI_ELEMENTS } from "~/constants/uiElements";
import { INVENTORY_MANAGEMENT_CONST } from "~/constants/InventoryManagement";

const emit = defineEmits(["update"]);

// 🛡 Утилита безопасного числа
function safeNumber(value: any): number {
  const num = Number(value);
  return !isFinite(num) || isNaN(num) ? 0 : num;
}

// 📦 Реактивные значения
const values: IInventoryManagement = reactive({
  monthlyDemand: 0,
  averageCost: 0,
  averageOrderSize: 0,
  productMaintenanceCost: 0,
  quantityOrderedProducts: 0,
});

// ✅ Обработка изменений
function change() {
  // Применим safeNumber ко всем значениям перед эмитом
  for (const key in values) {
    values[key as keyof IInventoryManagement] = safeNumber(values[key as keyof IInventoryManagement]);
  }
  emit("update", "inventoryManagement", { ...values });
}

// ✅ Отслеживание изменений (включая при инициализации)
watch(
  () => values,
  (newValues) => {
    for (const key in newValues) {
      newValues[key as keyof IInventoryManagement] = safeNumber(newValues[key as keyof IInventoryManagement]);
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
  <section class="inventory">
    <ol class="inventory__list">
      <li
        v-for="item in INVENTORY_MANAGEMENT_CONST"
        :key="item.id"
        class="inventory__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IInventoryManagement]"
          :min="item.props.min"
          :size="item.props.size"
          :placeholder="item.props.placeholder"
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


<style lang="scss" scoped>
.inventory {
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






<style lang="scss" scoped>
.inventory {
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
