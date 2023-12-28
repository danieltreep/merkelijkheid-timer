import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const data = ref();

  const session = ref({
    title: undefined,
    user_id: 2,
    category_id: 2,
    project_id: 4,
    created_at: null,
    stopped_at: null,
    time_elapsed: null,
  });

  return { data, session };
});
