import { computed, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "./user";

export const useDeliverablesStore = defineStore("deliverables", () => {
  const deliverables = ref([]);
  const todos = ref([]);
  const selectedDeliverable = ref({});

  const { user } = storeToRefs(useUserStore())

  
  
  return { deliverables, todos, selectedDeliverable };
}); 
