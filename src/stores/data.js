import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import getSessions from '@/composables/getSessions';

export const useDataStore = defineStore("data", () => {

  const sessions = ref([]);
  const projects = ref();
  const clients = ref([]);
  const searchterm = ref('');

  const filteredClients = computed(() => {
    return clients.value.filter(client => client.client_name.toLowerCase().includes(searchterm.value.toLowerCase()))
  })

  const sessionsDesc = computed(() => sessions.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

  const currentSession = ref({
    title: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: null,
    time_in_minutes: null
  });

  async function updateTable(table) {
    
    switch(table) {
      case 'sessions':
        sessions.value = await getSessions(30);
        break;
      case 'projects':
        projects.value = await getData(table);
        break;
      case 'clients':
        clients.value = await getData(table);
        break;
    }
  }

  function resetCurrentSession() {
    currentSession.value.project_id = null;
    currentSession.value.title = null;
    currentSession.value.stopped_at = null;
    currentSession.value.created_at = null;
    currentSession.value.time_elapsed = null;
    currentSession.value.time_in_minutes = null;
  }

  return { currentSession, sessions, sessionsDesc, projects, clients, filteredClients, searchterm, updateTable, resetCurrentSession };
});
