<template>
  <div class="mt-4">
    <ul v-if="clients" class="list-group">
      <li class="list-group-item list-group-item-secondary d-grid align-items-center header">
        <span>Client</span>
        <span>Tag color</span>
        <span>Projects</span>
      </li>
      <ClientListItem 
        v-for="client in sortedClients" 
        :key="client.client_id" 
        :client="client" 
        :projects="projects"
        :archived="archived" />
    </ul>

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from 'vue'

// Stores
import { useDataStore } from "@/stores/data";

// Components
import ClientListItem from "@/components/clients/ClientListItem.vue";

// Refs
const { projects } = storeToRefs(useDataStore());

// Props
const props = defineProps({
  clients: Array,
  archived: Boolean
})

const sortedClients = computed(() => {
  return props.clients.sort((a, b) => {
    return a.client_name.localeCompare(b.client_name);
  })
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
