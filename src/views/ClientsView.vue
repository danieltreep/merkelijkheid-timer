<template>
  <main class="py-5">
      <div class="d-flex">
        <ClientSearchbar />
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
      <EditProjectModal />
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useDataStore } from "@/stores/data";

import getData from "@/composables/getData";

import ClientSearchbar from "@/components/ClientSearchbar.vue";
import ClientList from "@/components/ClientList.vue";
import AddClientButton from "@/components/AddClientButton.vue";
import EditProjectModal from "@/components/EditProjectModal.vue";
import AddProjectModal from "@/components/AddProjectModal.vue";

const showArchive = ref(false);

const { projects, clients, tasks, clientsArchive, clientsNotArchived } = storeToRefs(useDataStore());

onMounted(async () => {
  projects.value = await getData('projects');
  clients.value = await getData('clients');
  tasks.value = await getData('tasks');
});
</script>

<style scoped>
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
