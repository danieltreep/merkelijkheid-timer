<template>
  <div class="col-6">
    <h2>Projects</h2>
    <ul v-if="projects" class="list-group">
      <ProjectListItem 
        v-for="project in projects" 
        :key="project.id" 
        :id="project.id" 
        :project-name="project.project_name"
        :clients="clients"
        :client-id="project.client_id"/>
    </ul>

    <ProjectAddBar :clients="clients"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import ProjectListItem from "@/components/ProjectListItem.vue";
import ProjectAddBar from "@/components/ProjectAddBar.vue";
import getData from "@/composables/getData";

const { projects, clients } = storeToRefs(useDataStore());

onMounted(async () => {
  const resProjects = await getData('projects');
  projects.value = resProjects;
  const resClients = await getData('clients');
  clients.value = resClients;
});

</script>

<style lang="css" scoped></style>
