<template>
  <main class="p-5">
    <div
      class="container d-flex border border-primary p-3 gap-3 rounded"
      v-if="data"
    >
      <input
        type="text"
        v-model="session.title"
        placeholder="Waar werk je aan?"
        class="form-control"
      />

      <select class="form-select" v-model="session.client_id">
        <option disabled selected>Selecteer bedrijf</option>

        <option
          v-for="(client, index) in data.clients"
          :key="index"
          :value="client.client_id"
        >
          {{ client.client_name }}
        </option>
      </select>

      <select class="form-select" v-model="session.category_id">
        <option disabled selected>Selecteer categorie</option>
        <option
          :value="category.category_id"
          v-for="(category, index) in data.categories"
          :key="index"
        >
          {{ category.category_name }}
        </option>
      </select>

      <Timer @onStopTimer="onStopTimer" />
    </div>
  </main>
</template>

<script setup>
import Timer from "@/components/Timer.vue";
import { onMounted } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
const { data, session } = storeToRefs(useDataStore());
import addSession from "@/composables/addSession";

async function onStopTimer() {
  console.log("stopped");
  await addSession();
}

onMounted(() => {
  fetch(
    "https://my-json-server.typicode.com/danieltreep/merkelijkheid-timer/db"
  )
    .then((res) => res.json())
    .then((db) => (data.value = db));
});
</script>
