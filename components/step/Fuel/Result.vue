<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  fuelEconomy: {
    type: Number,
    default:0, // Экономия топлива (км/л)
  },
  fuelPrice: {
    type: Number,
    default:0, // Цена топлива (за литр)
  },
  routeDistance: {
    type: Number,
    default:0, // Дистанция маршрута (км)
  },
  routeOptimization: {
    type: Number,
    default:0, // % оптимизации маршрута
  },
  habitSavings: {
    type: Number,
    default:0, // % экономии за счет привычек водителей
  },
  consumptionControl: {
    type: Number,
    default:0, // % экономии за счет контроля потребления
  },
  controlledAssets: {
    type: Number,
    default:0, // Количество контролируемых активов
  },
});

// Расчет ежемесячных затрат на топливо
const calculatedFuelCost = computed(() => {
  const assetsFactor = props.controlledAssets * 25; // Среднее использование активов
  const safeFuelEconomy = props.fuelEconomy || 1; // Защита от деления на 0

  const totalCost =
    ((props.routeDistance / safeFuelEconomy) * props.fuelPrice) * assetsFactor;

    return totalCost.toFixed(2);
});

// Расчет общей экономии топлива
const calculatedFuelSavings = computed(() => {
  const optimizationFactor = props.routeOptimization / 100 || 0;
  const habitFactor = props.habitSavings / 100 || 0;
  const controlFactor = props.consumptionControl / 100 || 0;

  const totalSavings =
    (parseFloat(calculatedFuelCost.value.replace("$", "")) || 0) *
    (optimizationFactor + habitFactor + controlFactor);

  return totalSavings.toFixed(2);
});
</script>

<template>
  <section class="result">
    <div class="result__inner">
      <div class="result-box">
        <span class="subtitle">Costos de combustible mensual:</span>
        <el-input
          v-model="calculatedFuelCost"
          :min="0"
          size="large"
          readonly
        >
        <template #prefix>
          $
        </template>
        </el-input>
      </div>
      <div class="result-box">
        <span class="subtitle">Ahorro total de combustible:</span>
        <el-input
          v-model="calculatedFuelSavings"
          :min="0"
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

<style scoped lang="scss">
.result {
  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }
}

.result-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
