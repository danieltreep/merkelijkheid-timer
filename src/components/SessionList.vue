<template>
  <div>
    <ul class="list-group" v-if="data">
      <SessionListItem :session="session" :projects="data.projects" :categories="data.categories" v-for="(session, index) in data.sessions" :key="index"/>
    </ul>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import SessionListItem from "./SessionListItem.vue";
const { data } = storeToRefs(useDataStore());


</script>

<style scoped></style>
