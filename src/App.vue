<script setup>
import { RouterLink, RouterView } from "vue-router";

import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";

const { user, userAuthenticated } = storeToRefs(useUserStore());
</script>

<template>
  <div class="container">
    <header class="py-4 d-flex justify-content-between align-items-center" v-if="userAuthenticated">
  
      <img src="@/assets/logo.svg" alt="">
      <nav class="ms-auto" >
        <RouterLink :to="{name: 'home'}">Time tracker</RouterLink>
        <RouterLink :to="{name: 'clients'}">Clients</RouterLink>
        <RouterLink :to="{name: 'reports'}">Reports</RouterLink>
      </nav>
    
        <div  class="d-flex align-items-center" >
          <img class="avatar" v-if="user.picture" :src="user.picture" >
        </div>
    </header>
  
    <RouterView />
  </div>
</template>

<style scoped>

.avatar {
  height: 44px;
  border-radius: 50%;
  border: 2px solid #AEDCE4;
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
</style>
