<template>
  <div class="container pb-2">
    <header class="py-4 d-flex justify-content-between align-items-center" v-if="userAuthenticated">
  
      <img class="logo" src="@/assets/logo.svg" @click="$router.push({name: 'home'})">
      
      <OnlineColleagues />

      <nav class="ms-auto" >
        <RouterLink :to="{name: 'home'}">Time tracker</RouterLink>
        <RouterLink :to="{name: 'clients'}">Clients</RouterLink>
        <RouterLink :to="{name: 'reports'}">Reports</RouterLink>
      </nav>
    
      <div  class="d-flex align-items-center" >
        <img class="avatar" v-if="user.picture" :src="user.picture" >
        <div class="empty-avatar" v-if="!user.picture">{{ getUserCredentials() }} </div>
      </div>
    </header>
  
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";
import OnlineColleagues from '@/components/OnlineColleagues.vue'
const { user, userAuthenticated } = storeToRefs(useUserStore());

function getUserCredentials() {
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
nav {
  margin-right: 1rem;
}
nav a {
  color: black;
  text-decoration: none;
  padding: .8rem 1.5rem;
  margin-left: .5rem;
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
</style>
