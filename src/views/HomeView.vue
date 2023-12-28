<template>
  <main class="p-5">
    <TimerBar />

    <SessionsList />
  </main>
</template>

<script setup>
import TimerBar from "@/components/TimerBar.vue";
import SessionsList from "@/components/SessionsList.vue";
import { onMounted } from "vue";
import getAllData from "@/composables/getAllData";

onMounted(() => {
  getAllData();
});
</script>
