<template>
  <div class="col-6">
    <h2>Projects</h2>
    <ul v-if="data" class="list-group">
      <ProjectListItem 
        v-for="project in projects" 
        :key="project.id" 
        :id="project.id" 
        :project-name="project.project_name"
        :clients="clientsArray"
        :client-id="project.client_id"/>
    </ul>

    <ProjectAddBar :clients="clientsArray"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import ProjectListItem from "@/components/ProjectListItem.vue";
import ProjectAddBar from "@/components/ProjectAddBar.vue";
import getData from "@/composables/getData";

const { data } = storeToRefs(useDataStore());

const projects = ref()
const clientsArray = ref();

onMounted(async () => {
  const resProjects = await getData('projects');
  projects.value = resProjects;
  const resClients = await getData('clients');
  clientsArray.value = resClients;
});

</script>

<style lang="css" scoped></style>
