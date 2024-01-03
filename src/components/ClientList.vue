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
import { onMounted, ref } from "vue";

import ClientListItem from "@/components/ClientListItem.vue";
import ClientAddBar from "@/components/ClientAddBar.vue";
import getData from "@/composables/getData";

const clients = ref([])

onMounted(async () => {
  const response = await getData('clients');
  clients.value = response;
});

</script>

<style lang="css" scoped></style>
