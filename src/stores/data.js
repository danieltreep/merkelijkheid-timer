import { ref, computed } from "vue";
import { defineStore } from "pinia";
import getData from '@/composables/getData';

export const useDataStore = defineStore("data", () => {
  // const data = ref();
  const sessions = ref();
  const projects = ref();
  const categories = ref();
  const clients = ref();

  const currentSession = ref({
    title: null,
    user_id: 2,
    category_id: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: null,
  });

  // const time_in_minutes = computed(() => )
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

  return { currentSession, sessions, projects, categories, clients, updateTable };
});
