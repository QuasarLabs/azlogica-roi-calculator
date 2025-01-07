<script setup lang="ts">
// Пропсы с результатами из предыдущих секций
const props = defineProps({
  monthlyDemand: {
    type: Number,
    default:0, // Ежемесячный спрос
  },
  averageCost: {
    type: Number,
    default:0, // Средняя стоимость
  },
  averageOrderSize: {
    type: Number,
    default:0, // Средний размер заказа
  },
  maintenanceCost: {
    type: Number,
    default:0, // Стоимость обслуживания
  },
  orderPlacementCost: {
    type: Number,
    default:0, // Стоимость размещения заказа
  },
  warehouseReduction: {
    type: Number,
    default:0, // % уменьшения товара на складе
  },
});

// Вычисление ежемесячных затрат на запасы
const monthlyInventoryCost = computed(() => {
  
  const cost =
    props.monthlyDemand * props.averageCost +
    (props.averageOrderSize / 2) * props.maintenanceCost +
    (props.monthlyDemand / props.averageOrderSize) * props.orderPlacementCost;

  return (isNaN(cost) ? 0 : cost).toFixed(2);
});

// Вычисление ежемесячной производительной экономии
const monthlyInventorySavings = computed(() => {

  const reductionFactor = props.warehouseReduction / 100;

  const savings =
    Number(monthlyInventoryCost.value) / 2 -
    (props.averageOrderSize / 2) * props.maintenanceCost * reductionFactor;

  return (isNaN(savings) ? 0 : savings).toFixed(2);
});

const emit = defineEmits(["updateResultData"]);

// Следим за изменением результатов и эмитим событие
watch(
  [monthlyInventoryCost, monthlyInventorySavings],
  ([newResult1, newResult2]) => {
    emit("updateResultData", "inventoryResult", {
      monthlyInventoryCost: newResult1,
      monthlyInventorySavings: newResult2,
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
      <span class="subtitle">Сostos de inventarios mensual:</span>  
        <el-input
          v-model="monthlyInventoryCost"
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
      <div class="result-box">
        <span class="subtitle">Ahorro de inventarios mensual:</span>
        <el-input
          v-model="monthlyInventorySavings"
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
