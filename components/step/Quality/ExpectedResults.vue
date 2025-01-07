<script setup lang="ts">
import type { IQualityManagementExpectedResults } from "~/types/QualityManagement";
import { QUALITY_EXPECTED_CONST } from "~/constants/QualityManagementConst";
import { UI_ELEMENTS } from "~/constants/uiElements";

// Datos reactivos para la entrada
const values: IQualityManagementExpectedResults = reactive({
  nonConformingProductReduction: 0, // Сокращение количества несоответствующей продукции
});

// Emisor para pasar datos al componente principal
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
    once: true,
  }
);
</script>

<template>
  <section class="expected-results">
    <div class="expected-results__box">
      <span class="subtitle">
        Resultados esperados de optimización de mantenimiento
      </span>
    </div>
    <ol class="expected-results__list">
      <li
        v-for="item in QUALITY_EXPECTED_CONST"
        :key="item.id"
        class="expected-results__item"
      >
        <div class="info">
          <strong class="subtitle">{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
        <component
          :is="UI_ELEMENTS[item.content]"
          v-model="values[item.model as keyof IQualityManagementExpectedResults]"
          v-bind="item.props"
          @change="change"
        />
      </li>
    </ol>
  </section>
</template>
