<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";

// Пропсы для входных данных
const props = defineProps({
  assetsToControl: {
    type: Number,
    default: 0, // Сколько активов вы хотите контролировать
  },
  monthlyProductivitySavings: {
    type: String || Number,
    default: 0, // Ежемесячная производительная экономия
  },
  monthlyRiskSavings: {
    type: String || Number,
    default: 0, // Ежемесячная экономия на рисках
  },
  monthlyInventorySavings: {
    type: String || Number,
    default: 0, // Ежемесячная экономия запасов
  },
  totalFuelSavings: {
    type: String || Number,
    default: 0, // Общая экономия топлива
  },
  maintenanceSavings: {
    type: String || Number,
    default: 0, // Экономия на обслуживании
  },
  maintenanceCosts: {
    type: String || Number,
    default: 0, // Расходы на обслуживание
  },
});

// Стоимость системы
const systemCost = computed(() => {
  return +props.assetsToControl * 450000;
});

// Общая ежемесячная экономия
const totalMonthlySavings = computed(() => {
  return (
    +props.monthlyProductivitySavings +
      +props.monthlyRiskSavings +
      +props.monthlyInventorySavings +
      +props.totalFuelSavings +
      +props.maintenanceSavings +
      +props.maintenanceCosts || 0.0
  );
});

// Чистая ежемесячная экономия
const netMonthlySavings = computed(() => {
  return +totalMonthlySavings.value - systemCost.value;
});

// Общая годовая экономия
const totalAnnualSavings = computed(() => {
  return +totalMonthlySavings.value * 12;
});

// Годовая стоимость системы
const annualSystemCost = computed(() => {
  return systemCost.value * 12;
});

// Чистая годовая экономия
const netAnnualSavings = computed(() => {
  return totalAnnualSavings.value - annualSystemCost.value;
});

// ROI
const roi = computed(() => {
  return (
    (+totalAnnualSavings.value - +annualSystemCost.value) /
    +annualSystemCost.value
  ).toFixed(2);
});

</script>

<template>
  <section class="calculator-result">
    <div class="calculator-result__box">
      <div class="monthly-savings">
        <h3 class="subtitle calculator-result__box-title">Ahorro mensual</h3>
        <ul class="calculator-result__list">
          <li class="calculator-result__item">
            <span class="subtitle">Ahorros totales</span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="totalMonthlySavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">Costo del sistema </span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="systemCost"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">Ahorro neto </span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="netMonthlySavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
        </ul>
      </div>
     <div class="calculator-result__col annual-savings">
        <h3 class="subtitle calculator-result__box-title">Ahorro anual</h3>
        <ul
          class="calculator-result__list calculator-result__list_ahorro-anual"
        >
          <li class="calculator-result__item">
            <span class="subtitle">Ahorros totales</span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="totalAnnualSavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">Costo del sistema </span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="annualSystemCost"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">Ahorro neto </span>
            <el-input
              :formatter="(value:number | string) =>moneyFormatter(value)"
              v-model="netAnnualSavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
        </ul>
      </div> 
    </div>
    <!-- ROI -->
    <div class="calculator-result__roi title_large">
      <h3>ROI =</h3>
      <p class="value">{{ (+roi < 0 || !roi) ? 0 : roi}}%</p>
    </div>
  </section>
</template>
