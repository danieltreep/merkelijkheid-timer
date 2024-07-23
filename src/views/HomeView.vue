<template>
  <main>
    <TimerBar :projects="projects" />

    <SessionList :projects="projects" v-for="(sessions, key) in groupSessionsByDay" :sessions="sessions" :date="key"  :key="key"/>

    <ChangeDateModal :today="false"/>
    <ShareSessionModal />
    <AddTaskModal />
    <ChangeTaskModal />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";
import { useSessionStore } from "@/stores/session";
import { useUserStore } from "@/stores/user";

// Composables
import getData from "@/composables/getData";
import getSessions from "@/composables/getSessions";

// Components
import TimerBar from "@/components/timer/TimerBar.vue";
import ChangeDateModal from "@/components/modals/ChangeDateModal.vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import ChangeTaskModal from "@/components/modals/ChangeTaskModal.vue";
import ShareSessionModal from "@/components/modals/ShareSessionModal.vue";
import SessionList from "@/components/sessions/SessionList.vue";

// Refs
const { projects, clients, sessions, tasks, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { groupSessionsByDay, stackedSessions } = storeToRefs(useSessionStore());
const { users, user } = storeToRefs(useUserStore());

// Methods
onMounted(async () => {
  sessionsOfAmountDays.value = 7;

  projects.value = await getData('projects');
  sessions.value = await getSessions(user.value.user_id, sessionsOfAmountDays.value);
  clients.value = await getData('clients');
  users.value = await getData('users');
  tasks.value = await getData('tasks');
});

</script>
