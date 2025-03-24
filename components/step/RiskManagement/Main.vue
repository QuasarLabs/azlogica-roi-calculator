<script setup lang="ts">
import { RISK_MANAGEMENT_CONST } from "~/constants/RiskManagementConst";
import { UI_ELEMENTS } from "~/constants/uiElements";
import type {IRiskManagement} from '~/types/IRiskManagement'
// Реактивные данные для хранения ответов
const riskManagementData:IRiskManagement = reactive({
  stolenAssetsPerMonth: 0,
  assetValue: 0,
  accidentCosts: 0,
  annualInsurancePremium: 0,
  descriptionAccident:``
});

const emit = defineEmits(["update"]);
function change() {
  emit("update", "riskManagement", riskManagementData);
}

watch(
  () => riskManagementData,
  (newValues) => {
    emit("update", "riskManagement", newValues); 
  },
  {
    immediate: true,
    deep: true, 
    once:true,
  }
);
</script>

<template>
  <section class="risk-management">
    <ol class="risk-management__list">
      <li
        v-for="item in RISK_MANAGEMENT_CONST"
        :key="item.id"
        class="risk-management__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.description }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="riskManagementData[item.model as keyof IRiskManagement]"
          v-bind="item.props"
          @change="change"
        >
        <template #prefix v-if="item.props.prefix">
         {{item.props.prefix}}
        </template>
        
        </component>
      </li>
    </ol>
  </section>
</template>
<style lang="scss" scoped>
.risk-management {
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
