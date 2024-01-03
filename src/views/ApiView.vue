<template>
  <main class="p-5">
    <div class="container">
      <div class="row">
        <p v-for="(item, index) in data" :key="index">{{ item.client_name }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import getAllData from "@/composables/getAllData";
import ClientList from "@/components/ClientList.vue";
import ProjectList from "@/components/ProjectList.vue";

const data = ref([]);

onMounted(() => {
  fetch('http://localhost/merkelijkheid-timer/api.php')
    .then(res => res.json())
    .then(d => data.value = d)
    .catch(error => data.value = error)
});
</script>

<style></style>
