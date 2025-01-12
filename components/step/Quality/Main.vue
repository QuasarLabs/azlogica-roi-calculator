<script setup lang="ts">
import { QUALITY_MANAGEMENT_CONST } from "~/constants/QualityManagementConst";
import { UI_ELEMENTS } from "~/constants/uiElements";
import type { IQualityManagement } from "~/types/QualityManagement";


// Реактивные данные для хранения ответов
const values:IQualityManagement = reactive({
  nonConformingProducts: 0, // Ежемесячное количество несоответствующей продукции
  productValue: 0, // Коммерческая ценность продукции
});

// Создание события для отправки данных
const emit = defineEmits(["update"]);
function change() {
  emit("update", "qualityManagement", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "qualityManagement", newValues); 
  },
  {
    immediate: true,
    deep: true, 
    once:true,
  }
);
</script>

<template>
  <section class="quality-management">
    <ol class="quality-management__list">
      <li
        v-for="item in QUALITY_MANAGEMENT_CONST"
        :key="item.id"
        class="quality-management__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IQualityManagement]"
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
.quality-management {
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
