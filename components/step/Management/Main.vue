<script lang="ts" setup>
import { reactive, computed } from "vue";
import {
  MANAGEMENT_SELECT_OPTIONS_ELEMENTS,
  ASSET_TYPE_QUESTIONS,
  ASSET_COUNT_QUESTIONS,
} from "~/constants/ManagementConst";

const emit = defineEmits(["update"]);

// Хранилище значений для v-model
const values: { [key: string]: any } = reactive({
  type: null,
  answer: "",
  numberControlledAssets: 1,
});

// Вопросы, зависящие от выбранного типа
// Вопросы, зависящие от выбранного типа
const question = computed(() =>
  values.type ? ASSET_TYPE_QUESTIONS[values.type] || "" : ""
);

const assetCountQuestion = computed(() =>
  values.type ? ASSET_COUNT_QUESTIONS[values.type] || "" : ""
);

function change() {
  emit("update", "assets", values);
}

watch(
  () => values,
  (newValues) => {
    emit("update", "assets", newValues);
  },
  {
    immediate: true,
    deep: true,
    once: true,
  }
);
</script>

<template>
  <section class="step-one">
    <ol class="step-one__list">
      <li class="step-one__item">
        <span class="subtitle"> ¿Qué tipo de Activo desea controlar? </span>
        <el-select
          clearable
          placeholder="Seleccione el tipo de activo"
          size="large"
          v-model="values.type"
        >
          <el-option
            v-bind="option.props"
            v-for="option in MANAGEMENT_SELECT_OPTIONS_ELEMENTS"
            :key="option.id"
          />
        </el-select>
      </li>
      <!-- Дополнительные вопросы для выбранного типа -->
      <template v-if="values.type">
        <li class="step-one__item">
          <span class="subtitle">{{ question }}</span>
          <el-input
            v-model="values.answer"
            placeholder="Ingrese su respuesta"
            size="large"
            @change="change"
          />
        </li>
        <li class="step-one__item">
          <span class="subtitle">{{ assetCountQuestion }}</span>
          <el-input-number
            @change="change"
            v-model="values.numberControlledAssets"
            :min="1"
            size="large"
          />
        </li>
      </template>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.step-one {
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 24px;
  }
  &__item {
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    @media screen and (min-width: $sm) {
      align-items: center;
      flex-direction: row;
    }
  }
}
</style>
