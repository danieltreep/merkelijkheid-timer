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
import ProjectListItem from "@/components/ProjectListItem.vue";
import ProjectAddBar from "@/components/ProjectAddBar.vue";

defineProps({
  clients: Array,
  projects: Array,
})

</script>

<style lang="css" scoped></style>
