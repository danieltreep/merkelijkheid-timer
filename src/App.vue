<script setup>
import { RouterLink, RouterView } from "vue-router";

import { decodeCredential } from 'vue3-google-login'

import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from "pinia";
import postData from "./composables/postData";
import getUser from "./composables/getUser";

const { user, userAuthorized } = storeToRefs(useUserStore());

const loginUser = async (response) => {
  const userData = decodeCredential(response.credential)
  user.value = userData; // Sla userdata op in de user store

  // Als gebruiker eindigt op merkelijkheid.com bekijk of dit de eerste login is. Zo ja, voeg toe aan users tabel.
  if (userAuthorized && !await getUser(user.value.email)) {
    await postData('users', {username: user.value.name, working: true, is_admin: 0, email: user.value.email})
  } 

  // Voeg id toe aan gebruiker zodat die aan een sessie kan worden toegevoegd
  user.value.id = await getUser(user.value.email);
  
}

</script>

<template>
  <div class="container">

    <header class="py-4 d-flex justify-content-between align-items-center">
  
      <img src="@/assets/logo.svg" alt="">
        <nav class="ms-auto">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/admin">Clients</RouterLink>
          <!-- <RouterLink to="/reports">Reports</RouterLink> -->
        </nav>
  
        <GoogleLogin :callback="loginUser" prompt auto-login v-if="!userAuthorized"/>
  
        <div v-if="userAuthorized" class="d-flex align-items-center">
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
  /* margin-inline: 1rem; */
  padding: .8rem 1.5rem;
  margin-left: .5rem;
  border-radius: var(--br);

}
nav a:not(.router-link-active):hover {
  background-color: var(--hover);
}
.router-link-active {
  background-color: white;
  /* color: white; */
  font-weight: 500;
  box-shadow: var(--bs);
}
</style>
