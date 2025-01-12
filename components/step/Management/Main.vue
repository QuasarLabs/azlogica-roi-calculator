<script lang="ts" setup>
import { reactive, computed } from "vue";
import { MANAGEMENT_ELEMENTS } from "~/constants/ManagementConst";
import { UI_ELEMENTS } from "~/constants/uiElements";

const emit = defineEmits(["update"]);

// Хранилище значений для v-model
const values: { [key: string]: any } = reactive({
  radio: true,
  type: null,
  answer: "",
  numberControlledAssets: 1,
});

// Вопросы, зависящие от выбранного типа
const question = computed(() => {
  if (values.type) {
    switch (values.type) {
      case 1:
        return "¿Qué tipo de activos estacionarios desea controlar?";
      case 2:
        return "¿Qué tipo de activos móviles desea gestionar?";
      case 3:
        return "¿En qué le gustaría enfocarse al gestionar personas y procesos?";
      default:
        return "";
    }
  }
  return "";
});

const assetCountQuestion = computed(() => {
  if (values.type) {
    switch (values.type) {
      case 1:
      case 2:
        return "¿Cuántos activos desea controlar?";
      case 3:
        return "¿A cuántas personas desea monitorear?";
      default:
        return "";
    }
  }
  return "";
});

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
    once:true,
  }
);

</script>

<template>
  <section class="step-one">
    <ol class="step-one__list">
      <li class="step-one__item" v-for="el in MANAGEMENT_ELEMENTS" :key="el.id">
        <span v-if="el.title" class="subtitle">
          {{ el.title }}
        </span>
          <component
            v-model="values[el.model]"
            :is="UI_ELEMENTS[el.content]"
            v-bind="el.props"
             @change="change"
          >
            <template v-if="el.children && el.children.length">
              <component
                v-for="child in el.children"
                :key="child.id"
                v-bind="child.props"
                :is="UI_ELEMENTS[child.content]"
                 @change="change"
              />
            </template>
          </component>
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
          <el-input-number @change="change" v-model="values.numberControlledAssets" :min="1" size="large" />
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
