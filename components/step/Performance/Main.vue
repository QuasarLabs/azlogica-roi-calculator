<script lang="ts" setup>

import { PERFOMANCE_CONST } from "~/constants/PerfomanceConst";
import { UI_ELEMENTS } from "~/constants/uiElements";
const emit = defineEmits(["update"]);
const values: { [key: string]: any } = reactive({
  laborHours: 0.0,
  dailyDowntime: 0.0,
  workerCount: 0,
  payrollValue: 0,
  productiveHRPercentage: 0,
  monthlyEnergyCost: 0,
  monthlyIncome: 0,
  monthlyMachineStopCost: 0,
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
  <section class="step-two">
    <ol class="step-two__list">
      <li
        v-for="item in PERFOMANCE_CONST"
        :key="item.id"
        class="step-two__item"
      >
        <span class="subtitle">{{ item.title }}</span>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model]"
          v-bind="item.props"
          @change="change"
        />
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.step-two {
  margin-bottom: 16px;
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
