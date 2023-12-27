<template>
  <main class="p-5">
    <div class="container" v-if="data">
      <input type="text" />
      <div v-for="(client, index) in data.clients" :key="index">
        {{ client.client_name }}
        <ul>
          <!-- <li v-for="(category, index) in data.project_categories" :key="index"></li> -->
        </ul>
      </div>
      <select name="" id="">
        <optgroup label="bedrijf">
          <option value="" v-for="(client, index) in data.clients" :key="index">
            {{ client.client_name }}
          </option>
        </optgroup>
      </select>
      <Timer />
    </div>
  </main>
</template>

<script setup>
import Timer from "@/components/Timer.vue";
import { onMounted } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
const { data } = storeToRefs(useDataStore());

onMounted(() => {
  fetch(
    "https://my-json-server.typicode.com/danieltreep/merkelijkheid-timer/db"
  )
    .then((res) => res.json())
    .then((db) => (data.value = db));
});
</script>
