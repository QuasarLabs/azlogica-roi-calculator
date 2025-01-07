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
<style lang="scss" scoped>
.expected-results {
  margin-bottom: 16px;
  padding-top: 16px;
  &__box {
    background-color: $result_bg;
    text-align: center;
    margin-bottom: 12px;
    border-radius: 4px;
    padding: 4px 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 24px;
    @media screen and (min-width: $sm) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 24px;
      column-gap: 50px;
    }
  }
  &__item {
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;

    @media screen and (min-width: $lg) {
      align-items: center;
      flex-direction: row;
    }
  }
}
</style>
