<template>
  <main class="py-5">
    <div class="d-flex justify-content-between">
      <button class="btn d-flex align-items-center gap-3 me-auto" @click="$router.push({name: 'reports'})">
        <img src="@/assets/icon-arrow-left.svg">
        Back to overview
      </button>
      <FilterByTask :tasks="tasks" @change-task-filter="(task) => activeTask = task"/>
      <FilterByUser />
      <ReportsFilter />
    </div>
  
    <ReportsList :sessions="sessionsByClientThatMatchTask" />      
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRoute } from 'vue-router'

// Stores
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";
import { useReportsStore } from "@/stores/reports";

// Composables
import getData from "@/composables/getData";
import getSessions from "@/composables/getSessions";

// Components
import ReportsList from "@/components/reports/ReportsList.vue";
import ReportsFilter from "@/components/reports/ReportsFilter.vue";
import FilterByTask from "@/components/reports/FilterByTask.vue";
import FilterByUser from "@/components/reports/FilterByUser.vue";

// Refs
const { projects, sessions, clients, tasks, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { filterUser, sessionsByClient } = storeToRefs(useReportsStore());
const { users } = storeToRefs(useUserStore());
const activeTask = ref({})
const route = useRoute()

const sessionsByThisClient = computed(() => sessionsByClient.value.find(session => session.client_id === route.params.clientid)?.sessions)

const sessionsByClientThatMatchTask = computed(() => {
  if (activeTask.value.task_id) {
    return sessionsByThisClient.value.filter(session => session.task_id === activeTask.value.task_id)
  } else {
    return sessionsByThisClient.value
  }
})

// Lifecycle
onBeforeMount(async () => {
  users.value = await getData('users')
  projects.value = await getData('projects');
  clients.value = await getData('clients');
  tasks.value = await getData('tasks');
  sessions.value = await getSessions(filterUser.value.user_id, sessionsOfAmountDays.value);
});

watch(filterUser, async () => {
  sessions.value = await getSessions(filterUser.value.user_id, sessionsOfAmountDays.value);
})
</script>

<style scoped>
button {
  font-size: 14px;
  height: 40px;
}
</style>
  