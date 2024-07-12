<template>
  <main>
    <TimerBar :projects="projects" />

    <SessionList :projects="projects" v-for="(sessions, key) in groupSessionsByDay" :sessions="sessions" :date="key"  :key="key"/>

    <ChangeDateModal :today="false"/>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { useSessionStore } from "@/stores/session";
import { useUserStore } from "@/stores/user";

import getData from "@/composables/getData";
import TimerBar from "@/components/TimerBar.vue";
import ChangeDateModal from "@/components/ChangeDateModal.vue";

import SessionList from "@/components/SessionList.vue";
import getSessions from "@/composables/getSessions";

const { projects, clients, sessions, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { groupSessionsByDay } = storeToRefs(useSessionStore());
const { users } = storeToRefs(useUserStore());

onMounted(async () => {
  sessionsOfAmountDays.value = 7;
  projects.value = await getData('projects');
  sessions.value = await getSessions(30, sessionsOfAmountDays.value);
  clients.value = await getData('clients');
  users.value = await getData('users');
});

</script>
