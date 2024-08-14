<template>
  <div class="mt-4">
    <ul v-if="sessions" class="list-group">
      <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center header">
        <span>Client</span>
        <span>Duration</span>
      </li>
      <div class="accordion" id="accordionExample">
        <ReportsListItem v-for="project in sessionsGroupedByProject" :key="project.project_id" :project="project" :filterUserId="filterUserId" />
      </div>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Components
import ReportsListItem from "@/components/reports/ReportsListItem.vue";

// Props
const props = defineProps({
  sessions: Array,
  filterUserId: String || null
})

const sessionsGroupedByProject = computed(() => {

  const projects = {}

  props.sessions?.forEach(session => {
    
    if (!projects[session.project_id]) {
      projects[session.project_id] = {
        project_id: session.project_id,
        project_name: session.project_name,
        color: session.color,
        client_name: session.client_name,
        sessions: [],
      }
    }

    projects[session.project_id].sessions.push(session)
  })

  return Object.values(projects);
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
