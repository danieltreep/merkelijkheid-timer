<template>
  <main class="py-5">
    <div class="d-flex justify-content-between">
      <button class="btn d-flex align-items-center gap-3 me-auto" @click="$router.push({name: 'reports'})">
        <img src="@/assets/icon-arrow-left.svg">
        Back to overview
      </button>
      <!-- <FilterByTask /> -->
      <FilterByUser />
      <ReportsFilter />
    </div>

    <ReportsList :projects="projectsBythisClient" />      
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
const { projects, sessions, clients, projectsNotArchived, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { filterUser } = storeToRefs(useReportsStore());
const { users } = storeToRefs(useUserStore());

const route = useRoute()

const projectsBythisClient = computed(() => {
  return projectsNotArchived.value.filter(session => session.client_id === route.params.clientid)
})

// Lifecycle
onBeforeMount(async () => {
  users.value = await getData('users')
  projects.value = await getData('projects');
  clients.value = await getData('clients');
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
  