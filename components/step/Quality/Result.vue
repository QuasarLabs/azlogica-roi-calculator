<script setup lang="ts">
import { moneyFormatter } from "~/helpers/MoneyFormatter";

// Пропсы с результатами из предыдущих секций
const props = defineProps({
  defectiveProductCount: {
    type: Number,
    default: 0,
    // Ежемесячное количество несоответствующей продукции
  },
  productCommercialValue: {
    type: Number,
    default: 0,
    // Коммерческая ценность продукции
  },
  reductionPercentage: {
    type: Number,
    default: 0,
    // Сокращение количества несоответствующей продукции в процентах
  },
});

// Вычисление ежемесячных расходов на несоответствующую продукцию
const monthlyDefectiveProductCost = computed(() => {
  return props.defectiveProductCount * props.productCommercialValue || 0.0;
});

// Вычисление общих расходов на обслуживание
const totalMaintenanceCost = computed(() => {
  const reductionPercentageDecimal = props.reductionPercentage / 100;
  const f1 =
    props.defectiveProductCount *
    reductionPercentageDecimal *
    props.productCommercialValue;
  return f1 || 0.0;
});
const emit = defineEmits(["updateResultData"]); // Объявляем событие

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyDefectiveProductCost, totalMaintenanceCost],
  ([newMonthlyCost, newTotalCost]) => {
    emit("updateResultData", "qualityResult", {
      monthlyDefectiveProductCost: newMonthlyCost,
      totalMaintenanceCost: newTotalCost,
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
      <!-- Ежемесячные расходы на несоответствующую продукцию -->
      <div class="result-box">
        <span class="subtitle"> Costos de mantenimiento mensual: </span>
        <el-input
          :formatter="(value:number | string) =>moneyFormatter(value)"
          v-model="monthlyDefectiveProductCost"
          size="large"
          readonly
        >
        <template #prefix>
          $
        </template>
        </el-input>
      </div>

      <!-- Общие расходы на обслуживание -->
      <div class="result-box">
        <span class="subtitle"> Costos de mantenimiento: </span>
        <el-input
          :formatter="(value:number | string) =>moneyFormatter(value)"
          v-model="totalMaintenanceCost"
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
