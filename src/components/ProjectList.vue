<template>
  <div class="col-6" v-if="data">
    <h2>Projects</h2>
    <ul v-if="data" class="list-group">
      <ProjectListItem 
        v-for="project in data.projects" 
        :key="project.id" 
        :id="project.id" 
        :project-name="project.project_name"
        :clients="data.clients"
        :client-id="project.client_id"/>
    </ul>

    <ProjectAddBar />
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import ProjectListItem from "@/components/ProjectListItem.vue";
import ProjectAddBar from "@/components/ProjectAddBar.vue";

const { data } = storeToRefs(useDataStore());

</script>

<style lang="css" scoped></style>
