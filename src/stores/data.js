import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import getSessions from '@/composables/getSessions';

export const useDataStore = defineStore("data", () => {

  const sessions = ref([]);
  const projects = ref();
  const clients = ref([]);
  const searchterm = ref('');
  const currentClientId = ref('')

  const clientsThatMatchSearch = computed(() => {
    return clients.value.filter(client => client.client_name.toLowerCase().includes(searchterm.value.toLowerCase()))
  })

  const clientsNotArchived = computed(() => {
    return clientsThatMatchSearch.value.filter(client => client.is_archived === '0')
  })

  const clientsArchive = computed(() => {
    return clientsThatMatchSearch.value.filter(client => client.is_archived === '1')
  })

  const finishedSessions = computed(() => {
    return sessions.value.filter(session => session.is_running === '0')
  })

  const runningSession = computed(() => {
    return sessions.value.filter(session => session.is_running === '1');
  })

  const sessionsDesc = computed(() => finishedSessions.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

  const currentSession = ref({
    title: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: `00:00:00`,
    time_in_minutes: null
  });

  async function updateTable(table) {
  
    switch(table) {
      case 'sessions':
        sessions.value = await getSessions(30);
        break;
      case 'projects':
        projects.value = await getData('projects');
        break;
      case 'clients':
        clients.value = await getData('clients');
        break;
    }
  }

  function resetCurrentSession() {
    currentSession.value.project_id = null;
    currentSession.value.title = null;
    currentSession.value.stopped_at = null;
    currentSession.value.created_at = null;
    currentSession.value.time_elapsed = `00:00:00`;
    currentSession.value.time_in_minutes = null;
  }

  const groupSessionsByDay = computed(() => {
    return sessionsDesc.value.reduce((groups, session) => {
      // Extract the date part from the created_at field
      const date = new Date(session.created_at).toISOString().split('T')[0];
  
      // If the date is not yet a key in the groups object, add it with an empty array
      if (!groups[date]) {
        groups[date] = [];
      }
  
      // Add the session to the corresponding date group
      groups[date].push(session);
  
      return groups;
    }, {});
  })

  return { 
    currentSession, 
    sessions,
    runningSession,
    finishedSessions,
    sessionsDesc, 
    projects, 
    clients, 
    clientsThatMatchSearch, 
    searchterm, 
    currentClientId,
    clientsArchive,
    clientsNotArchived,
    groupSessionsByDay,
    updateTable, 
    resetCurrentSession
  };
});
