<script setup lang="ts">
import { PERFOMANCE_EXPECTED_CONST } from "~/constants/PerfomanceConst";
import type {IPerfomanceExpectedResults} from '~/types/Perfomance'
import { UI_ELEMENTS } from "~/constants/uiElements";
const emit = defineEmits(["update"]);

const values:IPerfomanceExpectedResults = reactive({
  reduccionTiempoImproductivo: 0,
  productividadRRHH: 0,
  reduccionCostosEnergia: 0,
  reduccionParadas: 0,
});
function change() {
  emit("update", "perfomance", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "perfomance", newValues); 
  },
  {
    immediate: true,
    deep: true, 
    once:true,
  }
);
</script>

<template>
  <section class="expected-results">
    <div class="expected-results__box">
      <span class="subtitle">Resultados productivos esperados</span>
    </div>
    <ol class="expected-results__list">
      <!-- % reducción esperada del tiempo de inactividad -->
      <li
        v-for="item in PERFOMANCE_EXPECTED_CONST"
        :key="item.id"
        class="expected-results__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IPerfomanceExpectedResults]"
          v-bind="item.props"
          @change="change"
        />
      </li>
    </ol>
  </section>
</template>
