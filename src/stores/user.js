import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref([]);
  const users = ref([])

  const userAuthenticated = computed(() => {
    return user.value.hd === 'merkelijkheid.com'
  })
  
  return { user, users, userAuthenticated };
}); 
