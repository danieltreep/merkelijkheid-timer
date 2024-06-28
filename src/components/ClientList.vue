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
   
    <ClientAddBar />
  </div>
</template>

<script setup>
import ClientListItem from "@/components/ClientListItem.vue";
import ClientAddBar from "@/components/ClientAddBar.vue";

defineProps({
  clients: Array
})

</script>

<style scoped>
.header {
  font-size: 12px;
}
</style>
