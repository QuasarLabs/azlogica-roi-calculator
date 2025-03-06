<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";
import { FUEL_RESULT_LABELS } from "~/constants/FuelConst";
const props = defineProps({
  fuelEconomy: {
    type: Number,
    default: 0,
    // Экономия топлива (км/л)
    // Economía de combustible
  },
  fuelPrice: {
    type: Number,
    default: 0,
    // Цена топлива (за литр)
    // Precio de combustible por galón
  },
  routeDistance: {
    type: Number,
    default: 0,
    // Пройденное расстояние по маршрутам
    // Distancia recorrida en rutas
  },
  controlledAssets: {
    type: Number,
    default: 0, // Количество контролируемых активов
  },

  expectedRouteOptimization: {
    type: Number,
    default: 0,
    // % оптимизации маршрута
    // Ожидаемая оптимизация производительности маршрута
  },
  expectedHabitSavings: {
    type: Number,
    default: 0,
    // % экономии за счет привычек водителей
    // Экономия за счет ожидаемого улучшения привычек
  },
  expectedConsumptionControl: {
    type: Number,
    default: 0,
    // % экономии за счет контроля потребления
    // Control de consumo esperado
  },
});

// Расчет ежемесячных затрат на топливо

/**
 * ((Пройденное расстояние по маршрутам / Экономия топлива) * Цена топлива за галлон)
 *  * (Сколько активов вы хотите контролировать? (это из самой первой секции) * 25)
 */
const calculatedFuelCost = computed(() => {
  const f1 = props.routeDistance / props.fuelEconomy;
  const f2 = props.fuelPrice;
  const f3 = props.controlledAssets * 25;
  return Math.round(f1 * f2 * f3) || 0.0;
});

const calculatedFuelSavings = computed(() => {
  const expectedRouteOptimizationDecimal = props.expectedRouteOptimization / 100;
  const expectedHabitSavingsDecimal = props.expectedHabitSavings / 100;
  const expectedConsumptionControlDecimal = props.expectedConsumptionControl / 100;
  const f1 = +calculatedFuelCost.value * expectedRouteOptimizationDecimal;
  const f2 = +calculatedFuelCost.value * expectedHabitSavingsDecimal;
  const f3 = +calculatedFuelCost.value * expectedConsumptionControlDecimal;
  return Math.round(f1 + f2 + f3) || 0.0;
});

const emit = defineEmits(["updateResultData"]);

// Следим за изменением результатов и эмитим событие
watch(
  [calculatedFuelCost, calculatedFuelSavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "fuelResult", {
      fuelCost: newResult1,
      fuelSavings: newResult2,
    });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <section class="result">
    <div class="result__inner">
      <div class="result-box">
        <span class="subtitle">{{ FUEL_RESULT_LABELS.MONTHLY_FUEL_COST.name }}:</span>
        <el-input
          v-model="calculatedFuelCost"
          :formatter="(value:number | string) =>moneyFormatter(value)"
          :min="0"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
      <div class="result-box">
        <span class="subtitle">{{ FUEL_RESULT_LABELS.TOTAL_FUEL_SAVINGS.name }}:</span>
        <el-input
          v-model="calculatedFuelSavings"
          :formatter="(value:number | string) =>moneyFormatter(value)"
          :min="0"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
