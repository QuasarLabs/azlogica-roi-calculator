<script setup lang="ts">
const emit = defineEmits(["updateResultData"]);
import {moneyFormatter} from '~/helpers/MoneyFormatter'

// Пропсы с результатами из предыдущих секций
const props = defineProps({
  // Ежемесячная потребность в продукции
  // Demanda mensual de producto
  monthlyDemand: {
    type: Number,
    default:0, 
  }, 
  // Стоимость продукции
  // Costo de producto
  averageCost: {
    type: Number,
    default:0, 

  },
  // Стоимость размещения заказа у поставщика
  // Costo de pedir producto
  quantityOrderedProducts:{ 
    type: Number,
    default:0,  
  },
  // Количество заказываемой продукции
  // Tamaño de la orden pedida
  averageOrderSize:{
    type: Number,
    default:0, 
  },
  // Стоимость обслуживания продукта
  // Costo de mantenimiento de producto
  productMaintenanceCost: {
    type: Number,
    default:0,  
  },
  //Точность прогноза
  // Precisión de pronósticos
  forecastAccuracy:{
    type: Number,
    default:0,  
  },
  //  % уменьшения товара на складе
  warehouseReduction:{
    type: Number,
    default:0,  

  }
});

// Вычисление ежемесячных затрат на запасы
const monthlyInventoryCost = computed(() => {
const f1 = props.monthlyDemand * props.averageCost;
const f2 = ((props.averageOrderSize / 2) * props.productMaintenanceCost)
const f3 = (props.monthlyDemand / props.averageOrderSize) * props.quantityOrderedProducts;
return Math.round(f1+f2+f3) || 0.00
});

// Вычисление ежемесячной производительной экономии
const monthlyInventorySavings = computed(() => {

 const percentageforecastAccuracy = props.forecastAccuracy / 100; // Преобразуем процент в десятичную дробь
 const percentageWarehouseReduction = props.warehouseReduction / 100;
  const f1 = (monthlyInventoryCost.value / 2) - (((props.averageOrderSize / 2) * props.productMaintenanceCost) * percentageWarehouseReduction);
 const f2 =(((props.monthlyDemand / props.averageOrderSize) * props.quantityOrderedProducts * percentageforecastAccuracy))
 return Math.round(f1+f2) || 0.00

})


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
           :formatter="(value:number | string) =>moneyFormatter(value)"
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
          :formatter="(value:number | string) =>moneyFormatter(value)"
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
