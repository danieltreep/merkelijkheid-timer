<template>
  
  <ul class="list-group" v-if="sessions">
    <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Today, 25 jun 2024 <span class="d-flex align-items-center">Total: <span class="time ms-1"> 5:18 </span></span></li>
    <SessionListItem :session="session" v-for="(session, index) in sessions" :key="index"/>
  </ul>
  
</template>

<script setup>
import SessionListItem from "@/components/SessionListItem.vue";

defineProps({
  sessions: Array
})

</script>

<style scoped>
.time {
  font-size: 16px;
  color: #3A3A3A;
}
</style>
