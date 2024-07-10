<template>
  <div class="mt-4">
    <ul v-if="clients" class="list-group">
      <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center header">
        <span>Client</span>
        <span>Duration</span>
      </li>
      <ReportsListItem />
    </ul>
  </div>
</template>

<script setup>
import ReportsListItem from "@/components/ReportsListItem.vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

const { projects, clientsArchive } = storeToRefs(useDataStore());

defineProps({
  clients: Array,
  archived: Boolean
})

</script>

<style scoped>
.header {
  font-size: 12px;
  padding-inline: 2rem;
}

</style>
