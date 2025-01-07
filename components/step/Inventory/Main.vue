<script setup lang="ts">
import type { IInventoryManagement } from "~/types/inventoryManagement";
import { UI_ELEMENTS } from "~/constants/uiElements";
import { INVENTORY_MANAGEMENT_CONST } from "~/constants/InventoryManagement";
// Реактивные данные для хранения ответов
const values: IInventoryManagement = reactive({
  monthlyDemand: 0,
  averageCost: 0,
  averageOrderSize: 0,
  maintenanceCost: 0,
  quantityOrderedProducts:0,
});

// Создание события для отправки данных
const emit = defineEmits(["update"]);
function change() {
  emit("update", "inventoryManagement", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "inventoryManagement", newValues); 
  },
  {
    immediate: true,
    deep: true, 
    once:true,
  }
);

</script>

<template>
  <section class="inventory">
    <ol class="inventory__list">
      <li
        v-for="item in INVENTORY_MANAGEMENT_CONST"
        :key="item.id"
        class="inventory__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IInventoryManagement]"
          :min="item.props.min"
          :size="item.props.size"
          :placeholder="item.props.placeholder"
          @change="change"
        ></component>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.inventory {
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






<style lang="scss" scoped>
.inventory {
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
