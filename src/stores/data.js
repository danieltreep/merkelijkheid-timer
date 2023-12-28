import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const data = ref();

  const currentSession = ref({
    title: null,
    user_id: 2,
    category_id: null,
    project_id: null,
    created_at: null,
    stopped_at: null,
    time_elapsed: null,
  });

  return { data, currentSession };
});
