<script setup lang="ts">
// Пропсы с результатами из предыдущих секций
const props = defineProps({
  defectiveProductCount: {
    type: Number,
    default: 0, // Ежемесячное количество несоответствующей продукции
  },
  productCommercialValue: {
    type: Number,
    default: 0, // Коммерческая ценность продукции
  },
  monthlyMaintenanceCosts: {
    type: Number,
    default: 0, // Ежемесячные расходы на обслуживание
  },
  reductionPercentage: {
    type: Number,
    default: 0, // Сокращение количества несоответствующей продукции в процентах
  },
});

// Вычисление ежемесячных расходов на несоответствующую продукцию
const monthlyDefectiveProductCost = computed(() => {
  if (
    typeof props.defectiveProductCount === "number" &&
    typeof props.productCommercialValue === "number" &&
    props.defectiveProductCount >= 0 &&
    props.productCommercialValue >= 0
  ) {
    return props.defectiveProductCount * props.productCommercialValue
  }
});

// Вычисление общих расходов на обслуживание
const totalMaintenanceCost = computed(() => {
    const reduction = props.monthlyMaintenanceCosts * (props.reductionPercentage / 100);
    return props.monthlyMaintenanceCosts - reduction;
});
const emit = defineEmits(["updateResultData"]); // Объявляем событие

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyDefectiveProductCost, totalMaintenanceCost],
  ([newMonthlyCost, newTotalCost]) => {
    emit("updateResultData","qualityResult", {
        monthlyDefectiveProductCost: newMonthlyCost,
        totalMaintenanceCost: newTotalCost,
    });
  },{
    immediate:true
  }
);
</script>

<template>
  <section class="result">
    <div class="result__inner">
      <!-- Ежемесячные расходы на несоответствующую продукцию -->
      <div class="result-box">
        <span class="subtitle"> Costos de mantenimiento mensual: </span>
        <el-input v-model="monthlyDefectiveProductCost" size="large" readonly />
      </div>

      <!-- Общие расходы на обслуживание -->
      <div class="result-box">
        <span class="subtitle"> Costos de mantenimiento: </span>
        <el-input v-model="totalMaintenanceCost" size="large" readonly />
      </div>
    </div>
  </section>
</template>
