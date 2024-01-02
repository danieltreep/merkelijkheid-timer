<template>
  <div class="col-6">
    <h2>Clients</h2>
    <ul v-if="data" class="list-group">
      <ClientListItem v-for="client in data.clients" :key="client.id" :client="client" :id="client.id"/>
    </ul>
    <!-- <div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Client name"
          aria-label="Client name"
          aria-describedby="basic-addon1"
          v-model="clientName"
        />
       
        <AddButton :disabled="!clientName" @click="handleAdd" text="Add client"/>
      </div>
    </div> -->
    <ClientAddBar />
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import DeleteButton from "@/components/DeleteButton.vue";
import AddButton from "@/components/AddButton.vue";
import ClientListItem from "@/components/ClientListItem.vue";
import ClientAddBar from "@/components/ClientAddBar.vue";

const { data } = storeToRefs(useDataStore());

const clientName = ref("");

import postData from "@/composables/postData";
import { ref } from "vue";

function handleAdd() {
  postData("clients", { client_name: clientName.value });
  clientName.value = "";
}
</script>

<style lang="css" scoped></style>
