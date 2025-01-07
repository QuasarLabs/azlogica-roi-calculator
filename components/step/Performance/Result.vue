<script setup lang="ts">

const emit = defineEmits(["updateResultData"]);

const props = defineProps({
  laborHours: {
    type: Number ,
    default:0,
  },
  monthlyIncome: {
    type: Number,
    default:0,
  },
  dailyDowntime: {
    type: Number,
    default:0,
  },
  payrollValue: {
    type: Number,
    default:0,
  },
  workerCount: {
    type: Number,
    default:0,
  },
  productiveHRPercentage: {
    type: Number,
    default:0,
  },
  monthlyEnergyCost: {
    type: Number,
    default:0,
  },
  monthlyMachineStopCost: {
    type: Number,
    default:0,
  },
  expectedDowntimeReduction: {
    type: Number,
    default:0,
  },
  expectedEnergyCostReduction: {
    type: Number,
    default:0,
  },
  expectedStopReduction: {
    type: Number,
    default:0,
  },
});

// Первая строка расчета
const monthlyProductionCosts = computed(() => {

  const laborHoursDiff = props.laborHours - props.dailyDowntime;
  const safeDenominator = laborHoursDiff !== 0 ? laborHoursDiff : 1;

  const firstPart =
    (props.laborHours * props.monthlyIncome) / safeDenominator - props.monthlyIncome;

  const secondPart =
    (props.payrollValue / (props.workerCount || 1)) *
    props.workerCount *
    (1 - props.productiveHRPercentage / 100);

  const total =
    firstPart + secondPart + props.monthlyEnergyCost + props.monthlyMachineStopCost;

  return total.toFixed(2);
});

// Вторая строка расчета
const monthlyProductionSavings = computed(() => {

  const laborHoursDiff = props.laborHours - props.dailyDowntime;
  const safeDenominator = laborHoursDiff !== 0 ? laborHoursDiff : 1;

  const firstPart =
    ((props.laborHours * props.monthlyIncome) / safeDenominator - props.monthlyIncome) *
    (props.expectedDowntimeReduction / 100 || 0);

  const payrollPerWorker =
    props.workerCount !== 0 ? props.payrollValue / props.workerCount : 0;

  const secondPart =
    payrollPerWorker *
    props.workerCount *
    (1 - (props.productiveHRPercentage / 100 || 0));

  const energyReduction =
    props.monthlyEnergyCost * (props.expectedEnergyCostReduction / 100 || 0);

  const stopReduction =
    props.monthlyMachineStopCost * (props.expectedStopReduction / 100 || 0);

  const total = firstPart + secondPart + energyReduction + stopReduction;

  return total.toFixed(2);
});

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyProductionCosts, monthlyProductionSavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "perfomanceResult", {
      monthlyProductionCosts: newResult1,
      monthlyProductionSavings: newResult2,
    });
  },{
    immediate:true
  }
);
</script>


<template>
  <section class="result">
    <div class="result__inner">
      <div class="result-box">
      <span class="subtitle">Costos productivos mensuales:</span>  
        <el-input
          v-model="monthlyProductionCosts"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
        >
        <template #prefix>
          $
        </template>
        </el-input>
      </div>
      <div class="result-box">
        <span class="subtitle">Ahorros productivos mensuales:</span>
        <el-input
          v-model="monthlyProductionSavings"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
        >
        <template #prefix>
          $
        </template>
        </el-input>
      </div>
    </div>
  </section>
</template>