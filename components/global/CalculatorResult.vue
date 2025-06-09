<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";
import { RESULT_LABELS } from "~/constants/ResultConst";

// Пропсы
const props = defineProps({
  assetsToControl: { type: Number, default: 0 },
  monthlyProductivitySavings: { type: [String, Number], default: 0 },
  monthlyRiskSavings: { type: [String, Number], default: 0 },
  monthlyInventorySavings: { type: [String, Number], default: 0 },
  totalFuelSavings: { type: [String, Number], default: 0 },
  maintenanceSavings: { type: [String, Number], default: 0 },
  maintenanceCosts: { type: [String, Number], default: 0 },
});

// Эвент
const emit = defineEmits(["updateGlobalResultData"]);

// Ввод стоимости системы
const systemCost = ref(0);

// Утилита защиты
function safeNumber(value: number): number {
  return !isFinite(value) || isNaN(value) ? 0 : value;
}

// Вычисления
const totalMonthlySavings = computed(() =>
  safeNumber(
    +props.monthlyProductivitySavings +
      +props.monthlyRiskSavings +
      +props.monthlyInventorySavings +
      +props.totalFuelSavings +
      +props.maintenanceSavings +
      +props.maintenanceCosts
  )
);

const netMonthlySavings = computed(() =>
  safeNumber(+totalMonthlySavings.value - +systemCost.value)
);

const totalAnnualSavings = computed(() =>
  safeNumber(+totalMonthlySavings.value * 12)
);

const annualSystemCost = computed(() =>
  safeNumber(+systemCost.value * 12)
);

const netAnnualSavings = computed(() =>
  safeNumber(+totalAnnualSavings.value - +annualSystemCost.value)
);

const roi = computed(() => {
  const result = (+totalAnnualSavings.value - +annualSystemCost.value) / +annualSystemCost.value;
  return safeNumber(+result.toFixed(2));
});

// Обновление родителя
watch(
  () => ({
    totalMonthlySavings: totalMonthlySavings.value,
    systemCost: systemCost.value,
    netMonthlySavings: netMonthlySavings.value,
    totalAnnualSavings: totalAnnualSavings.value,
    annualSystemCost: annualSystemCost.value,
    netAnnualSavings: netAnnualSavings.value,
    roi: roi.value,
  }),
  (newValues) => {
    emit("updateGlobalResultData", newValues);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<template>
  <section class="calculator-result">
    <div class="calculator-result__box">
      <div class="monthly-savings">
        <h3 class="subtitle calculator-result__box-title">Ahorro mensual</h3>
        <ul class="calculator-result__list">
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.totalMonthlySavings.name }}</span>
            <el-input
              :formatter="(value: number | string) => moneyFormatter(value)"
              :model-value="totalMonthlySavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.systemCost.name }}</span>
            <el-input-number v-model="systemCost" :min="0">
              <template #prefix> $ </template>
            </el-input-number>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.netMonthlySavings.name }}</span>
            <el-input
              :model-value="netMonthlySavings"
              :formatter="(value: number | string) => moneyFormatter(value)"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
        </ul>
      </div>

      <div class="calculator-result__col annual-savings">
        <h3 class="subtitle calculator-result__box-title">Ahorro anual</h3>
        <ul class="calculator-result__list calculator-result__list_ahorro-anual">
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.totalAnnualSavings.name }}</span>
            <el-input
              :formatter="(value: number | string) => moneyFormatter(value)"
              :model-value="totalAnnualSavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.annualSystemCost.name }}</span>
            <el-input
              :formatter="(value: number | string) => moneyFormatter(value)"
              :model-value="annualSystemCost"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
          <li class="calculator-result__item">
            <span class="subtitle">{{ RESULT_LABELS.netAnnualSavings.name }}</span>
            <el-input
              :formatter="(value: number | string) => moneyFormatter(value)"
              :model-value="netAnnualSavings"
              readonly
            >
              <template #prefix> $ </template>
            </el-input>
          </li>
        </ul>
      </div>
    </div>

    <div class="calculator-result__roi title_large">
      <h3>{{ RESULT_LABELS.roi.name }} =</h3>
      <p class="value">{{ roi }} x</p>
    </div>
  </section>
</template>
