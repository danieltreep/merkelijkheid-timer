import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import getSessions from '@/composables/getSessions';

export const useDataStore = defineStore("data", () => {

  const sessions = ref([]);
  const projects = ref([]);
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

  return { 
    sessions,
    projects, 
    clients, 
    clientsThatMatchSearch, 
    searchterm, 
    currentClientId,
    clientsArchive,
    clientsNotArchived,
    updateTable, 
  };
});
