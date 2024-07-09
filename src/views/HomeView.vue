<template>
  <main>
    <TimerBar :projects="projects" />

    <SessionList :projects="projects" :sessions="sessions" :date="key" v-for="(sessions, key) in groupSessionsByDay" :key="key"/>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { useSessionStore } from "@/stores/session";

import getData from "@/composables/getData";
import TimerBar from "@/components/TimerBar.vue";

import SessionList from "@/components/SessionList.vue";
import getSessions from "@/composables/getSessions";

const { projects, clients, sessions } = storeToRefs(useDataStore());
const { groupSessionsByDay } = storeToRefs(useSessionStore());

onMounted(async () => {
  projects.value = await getData('projects');
  sessions.value = await getSessions(30);
  clients.value = await getData('clients');
});

</script>
