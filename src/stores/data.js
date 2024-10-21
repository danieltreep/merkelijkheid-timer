import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import getData from '@/composables/getData';
import getSessions from '@/composables/getSessions';
import { useUserStore } from "./user";
import { useDeliverablesStore } from "./deliverables";

export const useDataStore = defineStore("data", () => {

  const sessions = ref([]);
  const sessionsOfAmountDays = ref(7) // Show sessions of last 7 days
  const projects = ref([]);
  const clients = ref([]);
  const tasks = ref([]);
  const statuses = ref([]);
  const statusesOfToday = ref([]);

  const searchterm = ref('');
  const currentClientId = ref('')
  const projectToBePatched = ref({})
  
  const { user } = storeToRefs(useUserStore())
  const { deliverables, todos } = storeToRefs(useDeliverablesStore())

  const toast = ref({
    message: 'Record deleted succesfully',
    error: false,
    show: false
  })

  const clientsThatMatchSearch = computed(() => {
    return clients.value.filter(client => client.client_name.toLowerCase().startsWith(searchterm.value.toLowerCase()))
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
        sessions.value = await getSessions(user.value.user_id, sessionsOfAmountDays.value);
        break;
      case 'projects':
        projects.value = await getData('projects');
        break;
      case 'clients':
        clients.value = await getData('clients');
        break;
      case 'tasks':
        tasks.value = await getData('tasks');
        break;
      case 'deliverables':
        deliverables.value = await getData('deliverables');
        break;
      case 'todos':
        todos.value = await getData('todos', user.value.user_id);
        break;
      case 'statuses':
        statuses.value = await getData('statuses', user.value.user_id);
        break;
    }
  }

  function triggerToast(message, error) {
    toast.value.message = message;
    toast.value.error = error
    toast.value.show = true

    setTimeout(() => {
      toast.value.show = false
    }, 3000)
  }

  return { 
    sessions,
    sessionsOfAmountDays,
    projects, 
    projectToBePatched,
    toast,
    clients, 
    tasks,
    statuses,
    statusesOfToday,
    clientsThatMatchSearch, 
    searchterm, 
    currentClientId,
    clientsArchive,
    clientsNotArchived,
    updateTable, 
    triggerToast
  };
});
