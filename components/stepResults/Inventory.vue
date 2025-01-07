<script setup lang="ts">
import { computed, defineProps } from "vue";

// Пропсы с результатами из предыдущих секций
const props = defineProps({
  inventoryData: {
    type: Object,
    required: true,
    // Структура ожидаемых данных:
    // {
    //   monthlyDemand: number,
    //   averageCost: number,
    //   averageOrderSize: number,
    //   maintenanceCost: number,
    //   orderPlacementCost: number,
    //   warehouseReduction: number // в процентах
    // }
  },
});

// Вычисление ежемесячных затрат на запасы
const monthlyInventoryCost = computed(() => {
  // const {
  //   monthlyDemand,
  //   averageCost,
  //   averageOrderSize,
  //   maintenanceCost,
  //   orderPlacementCost,
  // } = props.inventoryData;

  // return (
  //   monthlyDemand * averageCost +
  //   (averageOrderSize / 2) * maintenanceCost +
  //   (monthlyDemand / averageOrderSize) * orderPlacementCost
  // );
});

// Вычисление ежемесячной производительной экономии
const monthlyInventorySavings = computed(() => {
  // const {
  //   averageOrderSize,
  //   maintenanceCost,
  //   warehouseReduction,
  // } = props.inventoryData;

  // const reductionFactor = warehouseReduction / 100;

  // return (
  //   monthlyInventoryCost.value / 2 -
  //   ((averageOrderSize / 2) * maintenanceCost * reductionFactor)
  // );
});
</script>

<template>
  <section class="section-results">
    <div class="container">
      <!-- Ежемесячные затраты на запасы -->
      <div class="result-item">
        <h3>COSTOS DE INVENTARIOS MENSUAL</h3>
        <p>ЕЖЕМЕСЯЧНЫЕ ЗАТРАТЫ НА ЗАПАСЫ</p>
        <!-- <p class="result-value">{{ monthlyInventoryCost.toFixed(2) }} $</p> -->
      </div>

      <!-- Ежемесячная производительная экономия -->
      <div class="result-item">
        <h3>AHORRO DE INVENTARIOS MENSUAL</h3>
        <p>ЕЖЕМЕСЯЧНАЯ ПРОИЗВОДИТЕЛЬНАЯ ЭКОНОМИЯ</p>
        <!-- <p class="result-value">{{ monthlyInventorySavings.toFixed(2) }} $</p> -->
      </div>
    </div>
  </section>
</template>
