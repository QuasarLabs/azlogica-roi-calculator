<script setup lang="ts">
const emit = defineEmits(["updateResultData"]);
import {moneyFormatter} from '~/helpers/MoneyFormatter'
const props = defineProps({
  laborHours: {
    // Количество часов в рабочем дне
    // Cantidad de horas en jornada laboral
    type: Number,
    default: 0,
  },
  monthlyIncome: {
    // Ежемесячный доход
    //Ingresos mensuales

    type: Number,
    default: 0,
  },
  dailyDowntime: {
    // Время простоя в день
    //Tiempo muerto diario
    type: Number,
    default: 0,
  },
  payrollValue: {
    // Сумма заработной платы
    // Valor de la nómina
    type: Number,
    default: 0,
  },
  workerCount: {
    // Количество работников
    // Cantidad de trabajadores
    type: Number,
    default: 0,
  },

  monthlyEnergyCost: {
    // Ежемесячная стоимость энергии
    // Costo de energía mensual
    type: Number,
    default: 0,
  },
  monthlyMachineStopCost: {
    //Стоимость ежемесячных остановок техники
    // Costo de paradas de maquinaria mensuales
    type: Number,
    default: 0,
  },
  percentageReductionExpectedStops: {
    // % сокращения ожидаемого времени простоя
    // % de reducción de tiempo improductivo esperado
    type: Number,
    default: 0, // ЭТО ПРОЦЕНТ %
  },

  expectedPercentageReductionEnergyCosts: {
    // Ожидаемое процентное снижение затрат на электроэнергию
    //% esperado de disminución de costos de energía
    type: Number,
    default: 0, // ЭТО ПРОЦЕНТ %
  },
  expectedProductividadRRHH: {
    // ПРОЦЕНТ ожидаемой производительности персонала
    //% de productividad de RRHH espera
    type: Number,
    default: 0, // ЭТО ПРОЦЕНТ %
  },
  percentageProductiveStaff: {
    /* ПРОЦЕНТ ПРОДУКТИВНОГО ПЕРСОНАЛА */
    /* de RRHH productivo */
    type: Number,
    default: 0, // ЭТО ПРОЦЕНТ %
  },
});

const monthlyProductionSavings = computed(() => {
  const laborHours = props.laborHours;
  const monthlyIncome = props.monthlyIncome;
  const dailyDowntime = props.dailyDowntime;
  const payrollValue = props.payrollValue;
  const workerCount = props.workerCount;
  const expectedProductividadRRHH = props.expectedProductividadRRHH / 100; // Преобразуем процент в десятичную дробь
  const monthlyEnergyCost = props.monthlyEnergyCost;
  const monthlyMachineStopCost = props.monthlyMachineStopCost;
  const percentageReductionExpectedStops =
    props.percentageReductionExpectedStops / 100; // Преобразуем процент в десятичную дробь
  const expectedPercentageReductionEnergyCosts =
    props.expectedPercentageReductionEnergyCosts / 100; // Преобразуем процент в десятичную дробь

  const f1 =
    ((laborHours * monthlyIncome) / (laborHours - dailyDowntime) -
      monthlyIncome) *
    percentageReductionExpectedStops;
  const f2 =
    (payrollValue / workerCount) *
    (workerCount * (1 - expectedProductividadRRHH));
  const f3 = expectedPercentageReductionEnergyCosts * monthlyEnergyCost;
  const f4 = monthlyMachineStopCost * 0.35;
  const result = f1 + f2 + f3 + f4;
  return Math.round(result) || 0.00;
});

// Первая строка расчета
const monthlyProductionCosts = computed(() => {
  const laborHours = props.laborHours;
  const monthlyIncome = props.monthlyIncome;
  const dailyDowntime = props.dailyDowntime;
  const payrollValue = props.payrollValue;
  const workerCount = props.workerCount;
  const percentageProductiveStaff = props.percentageProductiveStaff / 100; // Преобразуем процент в десятичную дробь
  // Первая часть выражения
  const f1 =
    (laborHours * monthlyIncome) / (laborHours - dailyDowntime) - monthlyIncome;
  const f2 =
    (payrollValue / workerCount) *
    (workerCount * (1 - percentageProductiveStaff));
  const total =
    f1 + f2 + props.monthlyEnergyCost + props.monthlyMachineStopCost;

  return Math.round(total) || 0.00;
});
watch(
  [monthlyProductionCosts, monthlyProductionSavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "perfomanceResult", {
      monthlyProductionCosts: newResult1,
      monthlyProductionSavings: newResult2,
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
        <span class="subtitle">Costos productivos mensuales:</span>
        <el-input
          :formatter="(value:number | string) => moneyFormatter(value)"
          v-model="monthlyProductionCosts"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
      <div class="result-box">
        <span class="subtitle">Ahorros productivos mensuales:</span>
        <el-input
          :formatter="(value:number | string) =>moneyFormatter(value)"
          v-model="monthlyProductionSavings"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
