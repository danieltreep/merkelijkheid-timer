<template>
  <main>
    <TimerBar :projects="projects" />

    <SessionList :projects="projects" :sessions="sessionsDesc"/>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

import getData from "@/composables/getData";
import TimerBar from "@/components/TimerBar.vue";

import SessionList from "@/components/SessionList.vue";
import getSessions from "@/composables/getSessions";

const { sessions, sessionsDesc, projects, clients } = storeToRefs(useDataStore());

onMounted(async () => {
  projects.value = await getData('projects');
  sessions.value = await getSessions(30);
  clients.value = await getData('clients');
});
</script>
