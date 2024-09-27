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
  // Check if user exists in local storage
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'));
    router.push({ name: 'home' });
  } else {
   
    const userData = decodeCredential(response.credential);
    user.value = userData; // Save user data in the user store

    // Check if user is authenticated and not already in the users table
    if (userAuthenticated.value && !await getUser(user.value.email)) {
      
      let picture = user.value.picture || 'https://merkelijkheid.nl/wp-content/themes/merkelijkheidnew/img/logo-dark.svg';

      // Post user data to the users table
      user.value.user_id = await postData('users', {
        username: user.value.name,
        is_clocking: 0,
        is_admin: 0,
        email: user.value.email,
        photo: picture,
        functie: null,
        personal_email: null,
        phonenumber: null,
        date_of_birth: null,
        street_and_house: null,
        zipcode: null,
        city: null,
        type_of_contract: null,
        employee_since: null,
        is_archived: 0
      });
    } else {
      user.value.user_id = await getUser(user.value.email);
    }

    // Save updated user data with user_id to local storage
   localStorage.setItem('user', JSON.stringify({ ...userData, user_id: user.value.user_id }));
    
    // Navigate to the home page
    router.push({ name: 'home' });
  }
};

</script>
<style scoped>

.login-screen {
    height: 100svh;
}
</style>