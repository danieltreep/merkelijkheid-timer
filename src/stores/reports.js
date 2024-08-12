import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import { reduceTimeElapsed, groupSessionsByClient } from '@/composables/functions';
import { useDataStore } from "./data";

export const useReportsStore = defineStore("reports", () => {

  const { sessions, clientsNotArchived } = storeToRefs(useDataStore())
  const lastMonthSessions = ref([])
  const filterUser = ref({})

  const sessionsByClient = computed(() => groupSessionsByClient(sessions.value, clientsNotArchived.value))
  const lastMonthGroupedByClient = computed(() => groupSessionsByClient(lastMonthSessions.value, clientsNotArchived.value))

  return { 
    sessionsByClient,
    lastMonthSessions,
    lastMonthGroupedByClient,
    filterUser
  };
});
