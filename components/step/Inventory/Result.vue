<script setup lang="ts">
const emit = defineEmits(["updateResultData"]);
import { moneyFormatter } from "~/helpers/MoneyFormatter";
import { INVENTORY_LABELS } from "~/constants/InventoryManagement";

// 🔐 Утилита для безопасных расчётов
function safeNumber(value: number): number {
  return !isFinite(value) || isNaN(value) ? 0 : Math.round(value);
}

// Пропсы
const props = defineProps({
  monthlyDemand: { type: Number, default: 0 },
  averageCost: { type: Number, default: 0 },
  quantityOrderedProducts: { type: Number, default: 0 },
  averageOrderSize: { type: Number, default: 0 },
  productMaintenanceCost: { type: Number, default: 0 },
  forecastAccuracy: { type: Number, default: 0 }, // %
  warehouseReduction: { type: Number, default: 0 }, // %
});

// 💰 Расчёт затрат на запасы
const monthlyInventoryCost = computed(() => {
  const f1 = props.monthlyDemand * props.averageCost;
  const f2 = (props.averageOrderSize / 2) * props.productMaintenanceCost;

  const f3 =
    props.averageOrderSize > 0
      ? (props.monthlyDemand / props.averageOrderSize) * props.quantityOrderedProducts
      : 0;

  return safeNumber(f1 + f2 + f3);
});

// 💸 Расчёт экономии
const monthlyInventorySavings = computed(() => {
  const forecastAccuracy = props.forecastAccuracy / 100;
  const warehouseReduction = props.warehouseReduction / 100;

  const f1 =
    (monthlyInventoryCost.value / 2) -
    (props.averageOrderSize / 2) *
      props.productMaintenanceCost *
      warehouseReduction;

  const f2 =
    props.averageOrderSize > 0
      ? (props.monthlyDemand / props.averageOrderSize) *
        props.quantityOrderedProducts *
        forecastAccuracy
      : 0;

  return safeNumber(f1 + f2);
});

// 🚀 Обновляем родителя
watch(
  [monthlyInventoryCost, monthlyInventorySavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "inventoryResult", {
      monthlyInventoryCost: newResult1,
      monthlyInventorySavings: newResult2,
    });
  },
  { immediate: true }
);
</script>

<template>
  <section class="result">
    <div class="result__inner">
      <div class="result-box">
        <span class="subtitle">{{ INVENTORY_LABELS.MONTHLY_INVENTORY_COST.name }}:</span>
        <el-input
          :model-value="monthlyInventoryCost"
          :formatter="(value: number | string) => moneyFormatter(value)"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>

      <div class="result-box">
        <span class="subtitle">{{ INVENTORY_LABELS.MONTHLY_INVENTORY_SAVINGS.name }}:</span>
        <el-input
          :model-value="monthlyInventorySavings"
          :formatter="(value: number | string) => moneyFormatter(value)"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
