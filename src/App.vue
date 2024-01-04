<script setup>
import { RouterLink, RouterView } from "vue-router";

import AsideNav from "./components/AsideNav.vue";
</script>

<template>
  <header class="p-3">
    <div class="wrapper d-flex justify-content-between align-items-center">
      <h4>Timer</h4>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>
    </div>
  </header>

  <AsideNav />

  <RouterView />
</template>

<style scoped>
header {
  grid-column: 1 / span 2;
  box-shadow: 0 4px 10px 2px #00000020;
}
</style>
