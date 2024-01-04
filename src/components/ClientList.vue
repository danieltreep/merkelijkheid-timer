<template>
  <div class="col-6">
    <h2>Clients</h2>

    <ul v-if="clients" class="list-group">
      <ClientListItem v-for="client in clients" :key="client.id" :client="client" :id="client.id"/>
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

<style lang="css" scoped></style>
