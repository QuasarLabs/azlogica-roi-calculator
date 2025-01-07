<script setup lang="ts">
const props = defineProps({
  stolenAssetsPerMonth: {
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
    default: 0,// Размер годовой страховой премии
  },
  theftReductionPercentage: {
    type: Number,
    default: 0, // % ожидаемого снижения краж
  },
  insuranceSavingsPercentage: {
    type: Number,
    default: 0, // % ожидаемой экономии от страхования
  },
  stopReductionPercentage: {
    type: Number,
    default: 0, // % сокращения ожидаемых остановок
  },
});

// Формула для ежемесячных расходов на риски
const monthlyRiskCosts = computed(() => {
  const totalCosts = (
    props.stolenAssetsPerMonth * props.assetValue +
    props.accidentCost +
    props.annualInsurancePremium / 12
  );
  return totalCosts !== undefined && !isNaN(totalCosts)
    ? totalCosts.toFixed(2)
    : "Datos insuficientes";
});

// Формула для ежемесячной экономии на рисках
const monthlyRiskSavings = computed(() => {
  const theftSavings =
    (props.theftReductionPercentage / 100) *
    props.stolenAssetsPerMonth *
    props.assetValue;

  const insuranceSavings =
    props.annualInsurancePremium / 12 - 
    (props.annualInsurancePremium * (props.insuranceSavingsPercentage / 100)) / 12;

  const accidentSavings =
    props.accidentCost * (props.stopReductionPercentage / 100);

  const totalSavings = theftSavings + insuranceSavings + accidentSavings;
  return totalSavings !== undefined && !isNaN(totalSavings)
    ? totalSavings.toFixed(2)
    : "Datos insuficientes";
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
  },{
    immediate:true
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
        >
        <template #prefix>
          $
        </template>
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
        >
        <template #prefix>
          $
        </template>
        </el-input>
      </div>
    </div>
  </section>
</template>

