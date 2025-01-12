<script setup>
import { NuxtLink } from "#components";
</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <el-button
          :tag="NuxtLink"
          to="https://azlogica.com/es/contacto/"
          color="#E4A710"
          >Saber más</el-button
        >
      </div>
    </div>
  </footer>
</template>
