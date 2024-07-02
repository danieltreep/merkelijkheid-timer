<template>
  <main class="py-5">
      <div class="d-flex">
        <div class="search d-flex align-items-center">
          <img src="@/assets/search-icon.svg">
          <input type="text" v-model="searchterm" placeholder="Search client">
        </div>
      <button class="ms-auto me-3" @click="showArchive = !showArchive" :class="showArchive ? 'active' : ''">
        <img class="me-2" v-if="!showArchive" src="@/assets/archive-icon.svg">
        <img class="me-2" v-if="showArchive" src="@/assets/archive-icon-paars.svg">
        Archive
      </button>
      <AddClientButton />
      </div>
      <ClientList :clients="clientsNotArchived" v-show="!showArchive" :archived="false" />      
      <ClientList :clients="clientsArchive" v-show="showArchive" :archived="true" />      
      <AddProjectModal />
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useDataStore } from "@/stores/data";

import getData from "@/composables/getData";

import ClientList from "@/components/ClientList.vue";
import AddClientButton from "@/components/AddClientButton.vue";
import AddProjectModal from "@/components/AddProjectModal.vue";

const showArchive = ref(false);

const { projects, clients, searchterm, clientsArchive, clientsNotArchived } = storeToRefs(useDataStore());

onMounted(async () => {
  projects.value = await getData('projects');
  clients.value = await getData('clients');
});
</script>

<style scoped>

.search {
  border: 1px solid var(--border);
  border-radius: var(--br);
  padding: 0 1rem;
  outline: none;
  background-color: transparent;
  width: 270px;
}
.search input {
  padding: .5rem 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: #6C757D;
}
button {
  background-color: transparent;
  border: 1px solid var(--border);
  padding: .5rem 1.5rem;
  border-radius: var(--br);
  font-size: 14px;
  font-weight: 500;
  color: #3A3A3A;
  display: flex;
  align-items: center;
  gap: .3rem;
}
.active {
  border: 1px solid var(--paars);
  background-color: #a340ef1c;
  color: var(--paars)
}

</style>
