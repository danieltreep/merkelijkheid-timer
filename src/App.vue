<template>
  <div class="container pb-2">
    <header class="py-4 d-flex justify-content-between align-items-center flex-wrap" v-if="userAuthenticated">
  
      <img class="logo" src="@/assets/logo.svg" @click="$router.push({name: 'home'})">

      <nav class="ms-lg-auto me-lg-4 mx-auto mt-5 mt-lg-0 d-none d-md-inline" >
        <RouterLink :to="{name: 'home'}">Time tracker</RouterLink>
        <RouterLink :to="{name: 'clients'}">Clients</RouterLink>
        <RouterLink :to="{name: 'reports'}">Reports</RouterLink>
      </nav>
    
      <div  class="align-items-center d-none d-lg-flex position-relative" >
        <RouterLink :to="{name: 'profile'}">
          <img class="avatar" v-if="user.picture" :src="user.picture" >
          <div class="empty-avatar" v-if="!user.picture">{{ getUserInitials() }} </div>
        </RouterLink>
        <!-- <LocationPopup /> -->

      </div>
    </header>

    <RouterView />
      
    <Toast />

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";

import Toast from '@/components/Toast.vue'
import LocationPopup from '@/components/LocationPopup.vue'

const { user, userAuthenticated } = storeToRefs(useUserStore());

function getUserInitials() {
  const voorletter = user.value.given_name.slice(0, 1);
  const achterletter = user.value.family_name.slice(0, 1);

  return voorletter + achterletter;
}

onMounted(() => {
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }
})

</script>

<style scoped>

.avatar {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: 2px solid #AEDCE4;
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
