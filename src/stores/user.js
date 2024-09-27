import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref([]);
  const users = ref([])

  const userAuthenticated = computed(() => {
    return user.value.hd === 'merkelijkheid.com'
  })

  const usersNotArchived = computed(() => {
    return users.value.filter(user => user.is_archived === '0')
  })

  const usersArchive = computed(() => {
    return users.value.filter(user => user.is_archived === '1')
  })
  
  return { user, users, userAuthenticated, usersNotArchived, usersArchive };
}); 
