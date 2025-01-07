<script setup lang="ts">
import { computed, defineProps } from "vue";

// Пропсы для входных данных
const props = defineProps({
  maintenanceCost: {
    type: Number,
    required: true,
    // Ежемесячная стоимость обслуживания и/или неисправности
  },
  costReduction: {
    type: Number,
    required: true,
    // Снижение ожидаемых затрат на техническое обслуживание (в %)
  },
});

// Вычисление ежемесячной экономии на обслуживании
const maintenanceSavings = computed(() => {
//   return props.maintenanceCost * (props.costReduction / 100);
});
</script>

<template>
  <section class="final-maintenance-results">
    <div class="container">
      <!-- Ежемесячные расходы на обслуживание -->
      <div class="result-item">
        <h3>COSTOS DE MANTENIMIENTO MENSUAL</h3>
        <p>ЕЖЕМЕСЯЧНЫЕ РАСХОДЫ НА ОБСЛУЖИВАНИЕ</p>
        <!-- <p class="result-value">{{ maintenanceCost.toFixed(2) }} $</p> -->
      </div>

      <!-- Экономия на обслуживании -->
      <div class="result-item">
        <h3>AHORRO EN MANTENIMIENTO</h3>
        <p>ЭКОНОМИЯ НА ОБСЛУЖИВАНИИ</p>
        <!-- <p class="result-value">{{ maintenanceSavings.toFixed(2) }} $</p> -->
      </div>
    </div>
  </section>
</template>