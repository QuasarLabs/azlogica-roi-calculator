<script setup lang="ts">
import type { IRiskManagementExpectedResults } from "~/types/IRiskManagement";
import { RISK_MANAGEMENT_EXPECTED_CONST } from "~/constants/RiskManagementConst";
import { UI_ELEMENTS } from "~/constants/uiElements";

// Datos reactivos para la entrada
const expectedResults: IRiskManagementExpectedResults = reactive({
  stopReduction: 0, // % de disminución de paradas esperado
  insuranceSavings: 0, // % de ahorros esperados de seguros
  theftReduction: 0, // % de disminución de hurtos esperado
});

const emit = defineEmits(["update"]);
function change() {
  emit("update", "riskManagement", expectedResults);
}
</script>

<template>
  <section class="expected-results">
    <div class="expected-results__box">
      <span class="subtitle">Resultados productivos esperados</span>
    </div>
    <ol class="expected-results__list">
      <li
        v-for="item in RISK_MANAGEMENT_EXPECTED_CONST"
        :key="item.id"
        class="expected-results__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="expectedResults[item.model as keyof IRiskManagementExpectedResults]"
          v-bind="item.props"
          @change="change"
        ></component>
      </li>
    </ol>
  </section>
</template>
<style lang="scss" scoped>
.expected-results {
  margin-bottom: 16px;
  // border-top: 1px solid $white;
  padding-top: 16px;
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
