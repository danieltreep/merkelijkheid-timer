<template>
  <main class="py-5">
    <div class="d-flex justify-content-between">
      <ClientSearchbar />
      <ReportsFilter />
    </div>

    <ReportsList :projects="projectsNotArchived" />         

  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";

import getData from "@/composables/getData";
import getSessions from "@/composables/getSessions";

import ReportsList from "@/components/ReportsList.vue";
import ReportsFilter from "@/components/ReportsFilter.vue";
import ClientSearchbar from "@/components/ClientSearchbar.vue";

const { projects, sessions, clients, projectsNotArchived, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { users } = storeToRefs(useUserStore());

onBeforeMount(async () => {
  users.value = await getData('users');
  projects.value = await getData('projects');
  clients.value = await getData('clients');
  sessions.value = await getSessions(null, sessionsOfAmountDays.value);
});
</script>

<style scoped>

.search {
  border: 1px solid var(--border);
  border-radius: var(--br);
  padding: 0 1rem;
  outline: none;
  background-color: transparent;
  width: 270px;
}
.search input {
  padding: .5rem 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: #6C757D;
}
  
</style>
  