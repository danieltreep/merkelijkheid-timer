<template>
    <div class="d-flex flex-column align-items-center justify-content-center gap-4 login-screen">
        <img src="@/assets/merkelijkheid-today.svg" class="mb-4" alt="">
        <GoogleLogin :callback="loginUser" prompt auto-login v-if="!userAuthenticated"/>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

import { decodeCredential } from 'vue3-google-login'

import postData from "@/composables/postData";
import getUser from "@/composables/getUser";

const router = useRouter()

const { user, userAuthenticated } = storeToRefs(useUserStore());

const loginUser = async (response) => {
  const userData = decodeCredential(response.credential)
  user.value = userData; // Sla userdata op in de user store

  // Als gebruiker eindigt op merkelijkheid.com bekijk of dit de eerste login is. Zo ja, voeg toe aan users tabel.
  if (userAuthenticated && !await getUser(user.value.email)) {
    await postData('users', {username: user.value.name, is_clocking: true, is_admin: 0, email: user.value.email, photo: user.value.picture})
  } 

  // Voeg id toe aan gebruiker zodat die aan een sessie kan worden toegevoegd
  user.value.user_id = await getUser(user.value.email);
  await router.push({name: 'home'})
}
</script>
<style scoped>

.login-screen {
    height: 100svh;
}
</style>