<script setup lang="ts">
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
  return props.maintenanceCost.toFixed(2);
});

// Вычисление экономии на обслуживании
const savingsOnMaintenance = computed(() => {
  return (
    Number(monthlyMaintenanceCosts.value) *
    (props.expectedCostReduction / 100)
  ).toFixed(2);
});

const emit = defineEmits(["updateResultData"]); // Объявляем событие

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyMaintenanceCosts, savingsOnMaintenance],
  ([newMonthlyMaintenanceCosts, newSavingsOnMaintenance]) => {
    emit("updateResultData","maintenanceResult", {
        monthlyMaintenanceCosts: newMonthlyMaintenanceCosts,
        savingsOnMaintenance: newSavingsOnMaintenance,
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
        <span class="subtitle">Costos de mantenimiento mensual:</span>
        <!-- Ежемесячные расходы на обслуживание -->
        <el-input
          v-model="monthlyMaintenanceCosts"
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
        <span class="subtitle">Ahorro en mantenimiento:</span>
        <!-- Экономия на обслуживании -->
        <el-input
          v-model="savingsOnMaintenance"
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