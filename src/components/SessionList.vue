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

.list-group-item {
  border: none;
  padding-left: 2rem;
  font-size: 14px;
}
.list-group {
  box-shadow: var(--bs);
  border-radius: var(--br);
}
.list-group-item-secondary {
  font-size: 12px;
  font-weight: 500;
  color: #8F8F8F;
}
.time {
  font-size: 16px;
  color: #3A3A3A;
}
</style>
