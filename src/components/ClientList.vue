<template>
  <div class="mt-4">
    <ul v-if="clients" class="list-group">
      <li class="list-group-item list-group-item-secondary d-grid align-items-center header">
        <span>Client</span>
        <span>Tag color</span>
        <span>Projects</span>
      </li>
      <ClientListItem 
        v-for="client in clients" 
        :key="client.client_id" 
        :client="client" 
        :projects="projects"
        :archived="archived" />
    </ul>
  </div>
</template>

<script setup>
import ClientListItem from "@/components/ClientListItem.vue";

import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const { projects } = storeToRefs(useDataStore());

defineProps({
  clients: Array,
  archived: Boolean
})

</script>

<style scoped>
.header {
  font-size: 12px;
}
.list-group-item {
    grid-template-columns: 20% 20% 1fr 180px 45px 45px;
}
.list-group-item.archived {
  grid-template-columns: 20% 20% 1fr 45px 45px;
}
</style>
