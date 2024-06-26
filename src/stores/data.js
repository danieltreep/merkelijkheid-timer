import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import { useUserStore } from '@/stores/user.js'


export const useDataStore = defineStore("data", () => {
  // const { user } = storeToRefs(useUserStore());

  const sessions = ref([]);
  const projects = ref();
  const categories = ref();
  const clients = ref();

  const sessionsDesc = computed(() => sessions.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

  const currentSession = ref({
    title: null,
    category_id: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: null,
    time_in_minutes: null
  });

  async function updateTable(table) {
    
    switch(table) {
      case 'sessions':
        sessions.value = await getData(table);
        break;
      case 'projects':
        projects.value = await getData(table);
        break;
      case 'clients':
        clients.value = await getData(table);
        break;
      case 'categories':
        categories.value = await getData(table);
        break;
    }
  }

  function resetCurrentSession() {
    currentSession.value.project_id = null;
    currentSession.value.category_id = null;
    currentSession.value.title = null;
    currentSession.value.stopped_at = null;
    currentSession.value.created_at = null;
    currentSession.value.time_elapsed = null;
    currentSession.value.time_in_minutes = null;
  }

  return { currentSession, sessions, sessionsDesc, projects, categories, clients, updateTable, resetCurrentSession };
});
