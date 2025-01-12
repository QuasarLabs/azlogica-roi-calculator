<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";

const props = defineProps({
  stolenAssetsPerMonth: { // + 
    type: Number,
    default: 0, // Сумма украденных активов за месяц
  },
  assetValue: {
    type: Number,
    default: 0, // Стоимость активов
  },
  accidentCost: {
    type: Number,
    default: 0, // Стоимость расходов на аварии
  },
  annualInsurancePremium: {
    type: Number,
    default: 0, // Размер годовой страховой премии
  },
  expectedReductionThefts: {
    type: Number,
    default: 0, // % ожидаемого снижения краж
  },
  expectedSavingsFromPolicy: {
    type: Number,
    default: 0, // % ожидаемой экономии от политики
  },
  expectedAccidentGap: {
    type: Number,
    default: 0, // % ожидаемого сокращения несчастных случаев
  },
  accidentCosts: {
    type: Number,
    default:0, // Стоимость аварии
  },
  reductionExpectedShutdowns:{ // +
    type: Number,
    default: 0, // % сокращения ожидаемых остановок

  }
});



// Формула для ежемесячных расходов на риски
const monthlyRiskCosts = computed(() => {
  const totalCosts =
    props.stolenAssetsPerMonth * props.assetValue +
    props.accidentCost +
    props.annualInsurancePremium / 12;
  return Math.round(totalCosts) || 0.00;
});

// Формула для ежемесячной экономии на рисках
const monthlyRiskSavings = computed(() => {
  const expectedReductionTheftsDecimal = props.expectedReductionThefts / 100;
  const expectedSavingsFromPolicyDecimal = props.expectedSavingsFromPolicy / 100;
  const reductionExpectedShutdownsDecimal = props.reductionExpectedShutdowns / 100;


const f1 = (expectedReductionTheftsDecimal * props.stolenAssetsPerMonth * props.assetValue);

const f2 = ((props.annualInsurancePremium / 12) - ((props.annualInsurancePremium * expectedSavingsFromPolicyDecimal) / 12));

const f3 = props.accidentCosts * reductionExpectedShutdownsDecimal;
return Math.round(f1 + f2 + f3) || 0.00;
});
const emit = defineEmits(["updateResultData"]);

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyRiskCosts, monthlyRiskSavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "riskManagementResult", {
      monthlyRiskCosts: newResult1,
      monthlyRiskSavings: newResult2,
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
      <!-- ЕЖЕМЕСЯЧНЫЕ РАСХОДЫ НА РИСКИ -->
      <div class="result-box">
        <span class="subtitle">Costos de riesgos mensuales:</span>
        <el-input
          v-model="monthlyRiskCosts"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
          :formatter="(value:number | string) =>moneyFormatter(value)"
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
      <!-- ЕЖЕМЕСЯЧНАЯ ЭКОНОМИЯ НА РИСКАХ -->
      <div class="result-box">
        <span class="subtitle">Ahorros de riesgos mensuales:</span>
        <el-input
          v-model="monthlyRiskSavings"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
          :formatter="(value:number | string) =>moneyFormatter(value)"
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
