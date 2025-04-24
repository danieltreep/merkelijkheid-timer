<template>
  <main class="py-5">
    <div class="d-flex justify-content-between">
      <ClientSearchbar />
      <FilterByUser />
      <ReportsFilter />
    </div>

    <div class="mt-4 d-grid">
      <ReportsCard v-for="client in sessionsByClient" :key="client.client_id" :client="client" />
    </div>     

  </main>
</template>

<script setup> 
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch } from "vue";

// Stores
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";
import { useReportsStore } from "@/stores/reports";

// Composables
import getData from "@/composables/getData";
import getSessions from "@/composables/getSessions";
import { getFirstDayOfPreviousMonth, getLastDayOfPreviousMonth, makeDateSqlCompatible } from '@/composables/functions'

// Components
import ReportsCard from "@/components/reports/ReportsCard.vue";
import ReportsFilter from "@/components/reports/ReportsFilter.vue";
import ClientSearchbar from "@/components/clients/ClientSearchbar.vue";
import FilterByUser from "@/components/reports/FilterByUser.vue";

// Refs
const { projects, sessions, clients, sessionsOfAmountDays } = storeToRefs(useDataStore());
const { users } = storeToRefs(useUserStore());
const { sessionsByClient, lastMonthSessions, filterUser, startDateRef } = storeToRefs(useReportsStore()); 

// Lifecycle
onBeforeMount(async () => {
  users.value = await getData('users');
  projects.value = await getData('projects');
  clients.value = await getData('clients');
  sessions.value = await getSessions(filterUser.value.user_id, sessionsOfAmountDays.value);
  lastMonthSessions.value = await getSessions(null, null, null, makeDateSqlCompatible(getFirstDayOfPreviousMonth()), makeDateSqlCompatible(getLastDayOfPreviousMonth()));
});

</script>

<style scoped>
.d-grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
</style>
  