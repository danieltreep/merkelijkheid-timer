<template>
  <main class="p-5">
    <TimerBar />

    <SessionList />
  </main>
</template>

<script setup>
import TimerBar from "@/components/TimerBar.vue";
import SessionList from "@/components/SessionList.vue";
import { onMounted } from "vue";
import getAllData from "@/composables/getAllData";

onMounted(() => {
  getAllData();
});
</script>
