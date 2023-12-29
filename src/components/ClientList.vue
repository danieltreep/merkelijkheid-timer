<template>
  <div class="col-6">
    <h2>Clients</h2>
    <ul v-if="data" class="list-group">
      <li
        v-for="client in data.clients"
        :key="client.id"
        class="list-group-item"
      >
        {{ client.client_name }}
        <DeleteButton db="clients" :id="client.id" />
      </li>
    </ul>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Client name</span>
        <input
          type="text"
          class="form-control"
          placeholder="Client name"
          aria-label="Client name"
          aria-describedby="basic-addon1"
          v-model="clientName"
        />
        <button
          class="btn btn-outline-dark"
          type="button"
          id="button-addon2"
          @click="handleAdd"
          :disabled="!clientName"
        >
          Add Client
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import DeleteButton from "@/components/DeleteButton.vue";

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
