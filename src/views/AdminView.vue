<template>
  <main class="p-5">
    <div class="container">
      <div class="row">
        <ClientList />
        <ProjectList />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import getAllData from "@/composables/getAllData";
import ClientList from "@/components/ClientList.vue";
import ProjectList from "@/components/ProjectList.vue";

onMounted(() => {
  getAllData();
});
</script>

<style></style>
