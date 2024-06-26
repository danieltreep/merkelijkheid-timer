import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref([]);

  const userAuthorized = computed(() => {
    return user.value.hd === 'merkelijkheid.com'
  })
  
  return { user, userAuthorized };
});
