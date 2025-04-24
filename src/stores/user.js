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

  const currentUser = computed(() => {
    return usersNotArchived.value.find(u => +u.user_id === +user.value.user_id)
  })
  
  const isUserBirthdayToday = computed(() => {
    if (!currentUser.value?.date_of_birth) return false;
    const today = new Date();
    const birthDate = new Date(currentUser.value?.date_of_birth);
    return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
  });
  
  return { user, users, currentUser, userAuthenticated, usersNotArchived, usersArchive, isUserBirthdayToday };
}); 
