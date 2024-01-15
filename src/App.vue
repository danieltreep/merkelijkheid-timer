<script setup>
import { RouterLink, RouterView } from "vue-router";

import AsideNav from "./components/AsideNav.vue";

import { decodeCredential } from 'vue3-google-login'

import { useUserStore } from '@/stores/user.js'
const { user } = useUserStore();

const callback = (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)

}

</script>

<template>
  <header class="p-3 d-flex justify-content-between align-items-center">
      <h4>Timer</h4>
      <nav>
    <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
    <!-- <button @click="login">Login Using Google</button> -->
        <GoogleLogin :callback="callback" prompt/>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <RouterLink to="/stats">Stats</RouterLink>
      </nav>
  </header>

  <AsideNav />

  <RouterView />
</template>

<style scoped>
header {
  grid-column: 1 / span 2;
  box-shadow: 0 4px 10px 2px #00000020;
}
</style>
