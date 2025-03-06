<script setup>
const emit = defineEmits(["generateAndSendPDF"]);
function generateAndSendPDF() {
  emit(`generateAndSendPDF`);
}
</script>

<template>
  <form @submit.prevent class="result-form">
    <label>
      Email Address
      <el-input :placeholder="'Email Address'" type="email">
        <template #prefix> @ </template>
      </el-input>
    </label>
    <el-button @click="generateAndSendPDF" color="#E4A710" type="submit"
      >Отправить форму</el-button
    >
  </form>
</template>

<style lang="scss">
.result-form {
  display: flex;
  flex-direction: column;
}
</style>
