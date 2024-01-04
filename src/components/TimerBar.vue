<template>
  <div
    class="container d-flex border border-primary p-3 gap-3 rounded"
    v-if="data"
  >
    <input
      type="text"
      v-model="currentSession.title"
      placeholder="Waar werk je aan?"
      class="form-control"
    />

    <select class="form-select" v-model="currentSession.project_id">
      <option disabled selected>Selecteer project</option>

      <option
        v-for="(project, index) in projects"
        :key="index"
        :value="project.id"
      >
        {{ project.project_name }}
      </option>
    </select>

    <select class="form-select" v-model="currentSession.category_id">
      <option disabled selected>Selecteer categorie</option>
      <option
        :value="category.id"
        v-for="(category, index) in categories"
        :key="index"
      >
        {{ category.category_name }}
      </option>
    </select>

    <Timer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import getData from "@/composables/getData";
import Timer from "@/components/Timer.vue";
const { data, currentSession } = storeToRefs(useDataStore());

const projects = ref();
const categories = ref();
const sessions = ref();

onMounted(async () => {
  const projectsRef = await getData('projects');
  projects.value = projectsRef;
  const categoriesRef = await getData('categories');
  categories.value = categoriesRef;
  const sessionsRef = await getData('categories');
  sessions.value = sessionsRef;
})
</script>
