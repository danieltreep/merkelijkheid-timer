<template>
  <main>
    <TimerBar :projects="projects" :categories="categories" />

    <SessionList :projects="projects" :sessions="sessionsDesc" :categories="categories"/>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

import getData from "@/composables/getData";
import TimerBar from "@/components/TimerBar.vue";

import SessionList from "@/components/SessionList.vue";

const { sessions, sessionsDesc, projects, categories } = storeToRefs(useDataStore());

onMounted(async () => {
  projects.value = await getData('projects');
  categories.value = await getData('categories');
  sessions.value = await getData('sessions');
});
</script>
