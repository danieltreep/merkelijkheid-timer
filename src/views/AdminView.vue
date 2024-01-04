<template>
  <main class="p-5">
    <div class="container">
      <div class="row">
        <ClientList :clients="clients"/>
        <ProjectList :clients="clients" :projects="projects"/>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useDataStore } from "@/stores/data";

import getData from "@/composables/getData";

import ClientList from "@/components/ClientList.vue";
import ProjectList from "@/components/ProjectList.vue";

const { projects, clients } = storeToRefs(useDataStore());

onMounted(async () => {
  projects.value = await getData('projects');
  clients.value = await getData('clients');
});
</script>

<style></style>
