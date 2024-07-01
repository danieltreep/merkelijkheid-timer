<template>
  <div class="mt-4">
    <ul v-if="clients" class="list-group">
      <li class="list-group-item list-group-item-secondary d-grid align-items-center header">
        <span>Client</span>
        <span>Tag color</span>
        <span>Projects</span>
      </li>
      <ClientListItem v-for="client in clients" :key="client.client_id" :client="client"/>
    </ul>
  </div>
</template>

<script setup>
import ClientListItem from "@/components/ClientListItem.vue";

defineProps({
  clients: Array
})

</script>

<style scoped>
.header {
  font-size: 12px;
}
.list-group-item {
    grid-template-columns: 20% 20% 1fr 180px 40px;
}
</style>
