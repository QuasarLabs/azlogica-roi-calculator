<script setup lang="ts">
import { PERFORMANCE_RESULT_LABELS } from "../../../constants/PerfomanceConst";
import { moneyFormatter } from "~/helpers/MoneyFormatter";

const emit = defineEmits(["updateResultData"]);

const props = defineProps({
  laborHours: { type: Number, default: 0 },
  monthlyIncome: { type: Number, default: 0 },
  dailyDowntime: { type: Number, default: 0 },
  payrollValue: { type: Number, default: 0 },
  workerCount: { type: Number, default: 0 },
  monthlyEnergyCost: { type: Number, default: 0 },
  monthlyMachineStopCost: { type: Number, default: 0 },
  percentageReductionExpectedStops: { type: Number, default: 0 }, // %
  expectedPercentageReductionEnergyCosts: { type: Number, default: 0 }, // %
  expectedProductividadRRHH: { type: Number, default: 0 }, // %
  percentageProductiveStaff: { type: Number, default: 0 }, // %
});

// 💡 Безопасное округление чисел
function safeNumber(value: number): number {
  return !isFinite(value) || isNaN(value) ? 0 : Math.round(value);
}

// 💰 Производственные сбережения
const monthlyProductionSavings = computed(() => {
  const laborHours = props.laborHours;
  const monthlyIncome = props.monthlyIncome;
  const dailyDowntime = props.dailyDowntime;
  const payrollValue = props.payrollValue;
  const workerCount = props.workerCount;
  const expectedProductividadRRHH = props.expectedProductividadRRHH / 100;
  const monthlyEnergyCost = props.monthlyEnergyCost;
  const monthlyMachineStopCost = props.monthlyMachineStopCost;
  const percentageReductionExpectedStops = props.percentageReductionExpectedStops / 100;
  const expectedPercentageReductionEnergyCosts = props.expectedPercentageReductionEnergyCosts / 100;

  const denominator = laborHours - dailyDowntime;
  const f1 = denominator > 0
    ? ((laborHours * monthlyIncome) / denominator - monthlyIncome) * percentageReductionExpectedStops
    : 0;

  const f2 = workerCount > 0
    ? (payrollValue / workerCount) * (workerCount * (1 - expectedProductividadRRHH))
    : 0;

  const f3 = expectedPercentageReductionEnergyCosts * monthlyEnergyCost;
  const f4 = monthlyMachineStopCost * 0.35;

  const result = f1 + f2 + f3 + f4;
  return safeNumber(result);
});

// 💸 Производственные затраты
const monthlyProductionCosts = computed(() => {
  const laborHours = props.laborHours;
  const monthlyIncome = props.monthlyIncome;
  const dailyDowntime = props.dailyDowntime;
  const payrollValue = props.payrollValue;
  const workerCount = props.workerCount;
  const percentageProductiveStaff = props.percentageProductiveStaff / 100;

  const denominator = laborHours - dailyDowntime;
  const f1 = denominator > 0
    ? (laborHours * monthlyIncome) / denominator - monthlyIncome
    : 0;

  const f2 = workerCount > 0
    ? (payrollValue / workerCount) * (workerCount * (1 - percentageProductiveStaff))
    : 0;

  const result = f1 + f2 + props.monthlyEnergyCost + props.monthlyMachineStopCost;
  return safeNumber(result);
});

// 📤 Передача данных
watch(
  [monthlyProductionCosts, monthlyProductionSavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "perfomanceResult", {
      monthlyProductionCosts: newResult1,
      monthlyProductionSavings: newResult2,
    });
  },
  { immediate: true }
);
</script>

<template>
  <section class="result">
    <div class="result__inner">
      <div class="result-box">
        <span class="subtitle">
          {{ PERFORMANCE_RESULT_LABELS.MONTHLY_PRODUCTION_COSTS.name }}:
        </span>
        <el-input
          :formatter="(value: number | string) => moneyFormatter(value)"
          :model-value="monthlyProductionCosts"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>

      <div class="result-box">
        <span class="subtitle">
          {{ PERFORMANCE_RESULT_LABELS.MONTHLY_PRODUCTION_SAVINGS.name }}:
        </span>
        <el-input
          :formatter="(value: number | string) => moneyFormatter(value)"
          :model-value="monthlyProductionSavings"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
