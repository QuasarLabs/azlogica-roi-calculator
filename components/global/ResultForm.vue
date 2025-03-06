<script setup>
const emit = defineEmits(["generateAndSendPDF"]);
const userData = reactive({
  email:``
})
function generateAndSendPDF() {
  emit(`generateAndSendPDF`,userData.email);
}
</script>

<template>
  <form @submit.prevent class="result-form">
    <div class="result-form__input">
      <label>
        Dirección de Correo Electrónico
        <el-input v-model="userData.email" :placeholder="'Dirección de Correo Electrónico'" type="email">
          <template #prefix> @ </template>
        </el-input>
      </label>
    </div>

    <el-button @click="generateAndSendPDF" color="#E4A710" type="submit">
      Enviar formulario
    </el-button>
  </form>
</template>

<style lang="scss" scoped>
.result-form {
  gap: 4px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: $sm) {
    flex-direction: row;
    justify-content: center;
    align-items: end;
  }

  button {
    height: 34px;
    width: 100%;
    @media screen and (min-width: $sm) {
      max-width: max-content;
    }
  }
  label {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
  }
}
</style>
