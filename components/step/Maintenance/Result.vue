<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";
import { MAINTENANCE_RESULT_LABELS } from "~/constants/MaintenanceConst";
// Пропсы с результатами из предыдущих секций
const props = defineProps({
  maintenanceCost: {
    type: Number,
    default: 0, // Стоимость обслуживания
  },
  expectedCostReduction: {
    type: Number,
    default: 0, // Снижение ожидаемых затрат на техническое обслуживание
  },
});

// Вычисление ежемесячных расходов на обслуживание
const monthlyMaintenanceCosts = computed(() => {
  return props.maintenanceCost;
});

// Вычисление экономии на обслуживании
const savingsOnMaintenance = computed(() => {
  return Number(monthlyMaintenanceCosts.value) * (props.expectedCostReduction / 100);
});

const emit = defineEmits(["updateResultData"]); // Объявляем событие

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyMaintenanceCosts, savingsOnMaintenance],
  ([newMonthlyMaintenanceCosts, newSavingsOnMaintenance]) => {
    emit("updateResultData", "maintenanceResult", {
      monthlyMaintenanceCosts: newMonthlyMaintenanceCosts,
      savingsOnMaintenance: newSavingsOnMaintenance,
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
        <span class="subtitle"
          >{{ MAINTENANCE_RESULT_LABELS.MONTHLY_MAINTENANCE_COSTS.name }}:</span
        >
        <!-- Ежемесячные расходы на обслуживание -->
        <el-input
          v-model="monthlyMaintenanceCosts"
          :formatter="(value:number | string) =>moneyFormatter(value)"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
      <div class="result-box">
        <span class="subtitle"
          >{{ MAINTENANCE_RESULT_LABELS.SAVINGS_ON_MAINTENANCE.name }}:</span
        >
        <!-- Экономия на обслуживании -->
        <el-input
          v-model="savingsOnMaintenance"
          :formatter="(value:number | string) =>moneyFormatter(value)"
          :min="0"
          :max="100"
          :step="1"
          size="large"
          readonly
        >
          <template #prefix> $ </template>
        </el-input>
      </div>
    </div>
  </section>
</template>
