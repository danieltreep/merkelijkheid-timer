<template>
  <div class="container d-flex border border-primary p-3 gap-3 rounded">
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
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

import Timer from "@/components/Timer.vue";

defineProps({
  projects: Array,
  categories: Array,
})

const { currentSession } = storeToRefs(useDataStore());

</script>
