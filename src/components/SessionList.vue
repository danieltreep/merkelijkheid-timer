<template>
  
  <ul class="list-group" v-if="sessions">
    <SessionListItem :session="session" :projects="projects" :categories="categories" v-for="(session, index) in sessions" :key="index"/>
  </ul>
  
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import SessionListItem from "./SessionListItem.vue";
import { onMounted, ref } from "vue";
import getData from "@/composables/getData";

const { sessions, projects, categories } = storeToRefs(useDataStore());

onMounted(async () => {
  const projectsRef = await getData('projects');
  projects.value = projectsRef;
  const categoriesRef = await getData('categories');
  categories.value = categoriesRef;
  const sessionsRef = await getData('sessions');
  sessions.value = sessionsRef;
})


</script>

<style scoped></style>
