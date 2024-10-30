<template>
  <div class="container pb-2">
    <header class="py-4 d-flex justify-content-between align-items-center flex-wrap" v-if="userAuthenticated">
  
      <img class="logo" src="@/assets/logo.svg" @click="$router.push({name: 'home'})">

      <nav class="ms-lg-auto me-lg-4 mx-auto mt-5 mt-lg-0 d-none d-md-inline" >
        <RouterLink :to="{name: 'home'}">Time tracker</RouterLink>
        <RouterLink :to="{name: 'reports'}">Reports</RouterLink>
        <RouterLink :to="{name: 'tasks'}">Tasks</RouterLink>
      </nav>
    
      <div  class="align-items-center d-none d-lg-flex position-relative" >
        <RouterLink :to="{name: 'profile'}">
          <img class="avatar" :class="{birthday: isUserBirthdayToday}" v-if="user.picture" :src="user.picture" >
          <div class="empty-avatar" v-if="!user.picture">{{ getUserInitials() }} </div>
        </RouterLink>
        <LocationPopup v-if="!hasStatusToday && checkForPopup" />
      </div>
    </header>

    <RouterView />
      
    <Toast />

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";

import Toast from '@/components/Toast.vue'
import LocationPopup from '@/components/LocationPopup.vue'
import { useDataStore } from "./stores/data";
import getData from '@/composables/getData';

const { user, userAuthenticated, isUserBirthdayToday } = storeToRefs(useUserStore());
const { statuses } = storeToRefs(useDataStore())

const checkForPopup = ref(false)

const hasStatusToday = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return statuses.value.some(status => status.date === today);
});

function getUserInitials() {
  const voorletter = user.value.given_name.slice(0, 1);
  const achterletter = user.value.family_name.slice(0, 1);

  return voorletter + achterletter;
}

onMounted(async () => {
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
    statuses.value = await getData('statuses', user.value.user_id)
  }
  setTimeout(() => {
    checkForPopup.value = true
  }, 1000)
})

</script>

<style scoped>

.avatar {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: 2px solid #AEDCE4;
}
.avatar.birthday::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  top: -6px;
  left: 50%;
  transform: translateX(-40%) rotate(10deg);
  background-image: url('@/assets/partyhat.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.empty-avatar {
  height: 44px;
  width: 44px;
  background-color: rgb(221, 221, 221);
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #2e2e2e;
}

nav a {
  color: black;
  text-decoration: none;
  padding: .8rem 1rem;
  margin-right: .5rem;
  border-radius: var(--br);
}
nav a:hover {
  background-color: var(--hover);
}
.router-link-active {
  font-weight: 600;
}
.logo {
  cursor: pointer;
}
.main-section {
  width: 94%;
}
</style>
