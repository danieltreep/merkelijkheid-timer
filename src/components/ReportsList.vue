<template>
  <div class="mt-4">
    <ul v-if="projects" class="list-group">
      <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center header">
        <span>Client</span>
        <span>Duration</span>
      </li>
      <div class="accordion" id="accordionExample">
        <ReportsListItem v-for="project in projects" :key="project.project_id" :project="project"/>
      </div>
    </ul>
  </div>
</template>

<script setup>
import ReportsListItem from "@/components/ReportsListItem.vue";

defineProps({
  projects: Array
})

</script>

<style scoped>
.header {
  font-size: 12px;
  padding-inline: 2rem;
}
.list-group {
  overflow: hidden;
}
</style>
