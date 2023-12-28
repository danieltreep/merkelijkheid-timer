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
      <option disabled selected>Selecteer bedrijf</option>

      <option
        v-for="(project, index) in data.projects"
        :key="index"
        :value="project.project_id"
      >
        {{ project.project_name }}
      </option>
    </select>

    <select class="form-select" v-model="currentSession.category_id">
      <option disabled selected>Selecteer categorie</option>
      <option
        :value="category.category_id"
        v-for="(category, index) in data.categories"
        :key="index"
      >
        {{ category.category_name }}
      </option>
    </select>

    <Timer @onStopTimer="onStopTimer" />
  </div>
</template>

<script setup>
import Timer from "@/components/Timer.vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
const { data, currentSession } = storeToRefs(useDataStore());
import postData from "@/composables/postData";

function onStopTimer() {
  postData("sessions");
}
</script>
