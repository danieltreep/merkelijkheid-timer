import { computed, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "./user";

export const useDeliverablesStore = defineStore("deliverables", () => {
  const deliverables = ref([]);
  const todos = ref([]);

  const { user } = storeToRefs(useUserStore())

  const groupedDeliverables = computed(() => {
    const deliverablesMap = new Map();

    deliverables.value.forEach(deliverable => {
      if (deliverable.has_parent === '0') {
        deliverablesMap.set(deliverable.deliverable_id, { ...deliverable, children: [] });
      }
    });

    deliverables.value.forEach(deliverable => {
      if (deliverable.has_parent === '1' && deliverablesMap.has(deliverable.parent_deliverable_id)) {
        deliverablesMap.get(deliverable.parent_deliverable_id).children.push(deliverable);
      }
    });

    return Array.from(deliverablesMap.values());
  });

  const deliverablesAssigned = computed(() => {
    return groupedDeliverables.value.filter(parent => {
      if (+parent.assignee_user_id === +user.value.user_id) {
        return true;
      }
      return parent.children.some(child => +child.assignee_user_id === +user.value.user_id);
    });
  });
  
  return { deliverables, deliverablesAssigned, todos };
}); 
