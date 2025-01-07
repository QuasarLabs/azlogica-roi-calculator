<script setup lang="ts">
import { computed, defineProps } from "vue";

// Пропсы для входных данных
const props = defineProps({
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
  assetsToControl: {
    type: String || Number,
    default: 0, // Сколько активов вы хотите контролировать
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
    +props.maintenanceCosts
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
  if (systemCost.value === 0) return 0;
  return +(+totalMonthlySavings.value - systemCost.value) / systemCost.value;
});
</script>

<template>
  <section class="calculator-results">
    <h2 class="">Cálculo del ROI</h2>
    <div class="calculator-results__top">
      <span>Ahorro mensual</span>
      <span>Ahorro anual</span>
    </div>
    <div class="calculator-results__inner">
    <!-- 1 КОЛОНКА -->
      <div class="calculator-results__info">
        <div class="calculator-results__box">
          <!-- Ежемесячная экономия -->
          <span>Ahorros totales (Общая экономия):</span>
          <el-input :value="totalMonthlySavings.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>
        <div class="calculator-results__box">
          <span>Costo del sistema (Стоимость системы):</span>
          <el-input :value="systemCost.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>
        <div class="calculator-results__box">
          <span>Ahorro neto (Чистая экономия):</span>
          <el-input :value="netMonthlySavings.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>
      </div>
    <!-- 2 КОЛОНКА -->
      <div class="calculator-results__info">
        <div class="calculator-results__box">
          <!-- Годовая экономия -->
          <span>Ahorros totales (Общая экономия):</span>
          <el-input :value="totalAnnualSavings.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>

        <div class="calculator-results__box">
          <!-- Годовая экономия -->
          <span>Costo del sistema (Стоимость системы):</span>
          <el-input :value="annualSystemCost.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>
      
        <div class="calculator-results__box">
          <!-- Годовая экономия -->
          <span>Ahorro neto (Чистая экономия):</span>
          <el-input :value="netAnnualSavings.toFixed(2)" readonly>
            <template #prefix> $ </template>
          </el-input>
        </div>


      </div>

    </div>
    <div class="calculator-results__footer">
      <h2 class="roi">ROI</h2>
      <div class="roi">{{ (roi * 100).toFixed(2) }}%</div>
    </div>
    <!-- Ежемесячная экономия -->
    <!-- <div class="result-group">
      <h3>Ahorro mensual</h3>
      <div class="result">
        <p>Ahorros totales (Общая экономия):</p>
        <p class="value">{{ totalMonthlySavings.toFixed(2) }} ₽</p>
      </div>
      <div class="result">
        <p>Costo del sistema (Стоимость системы):</p>
        <p class="value">{{ systemCost.toFixed(2) }} ₽</p>
      </div>
      <div class="result">
        <p>Ahorro neto (Чистая экономия):</p>
        <p class="value">{{ netMonthlySavings.toFixed(2) }} ₽</p>
      </div>
    </div> -->

    <!-- Годовая экономия -->
    <!-- <div class="result-group">
      <h3>Ahorro anual</h3>
      <div class="result">
        <p>Ahorros totales (Общая экономия):</p>
        <p class="value">{{ totalAnnualSavings.toFixed(2) }} </p>
      </div>
      <div class="result">
        <p>Costo del sistema (Стоимость системы):</p>
        <p class="value">{{ annualSystemCost.toFixed(2) }} </p>
      </div>
      <div class="result">
        <p>Ahorro neto (Чистая экономия):</p>
        <p class="value">{{ netAnnualSavings.toFixed(2) }} </p>
      </div>
    </div> -->

    <!-- ROI -->
    <!-- <div class="result-group">
      <h3>ROI</h3>
      <div class="result">
        <p>Рентабельность инвестиций:</p>
        <p class="value">{{ (roi * 100).toFixed(2) }}%</p>
      </div>
    </div> -->
  </section>
</template>
