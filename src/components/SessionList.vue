<template>
  
  <ul class="list-group" v-if="sessions">
    <SessionListItem :session="session" :projects="projects" :categories="categories" v-for="(session, index) in sessions" :key="index"/>
  </ul>
  
</template>

<script setup>
import SessionListItem from "@/components/SessionListItem.vue";

defineProps({
  sessions: Array,
  categories: Array,
  projects: Array,
})

</script>
