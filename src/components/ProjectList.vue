<template>
  <div class="col-6" v-if="data">
    <h2>Projects</h2>
    <ul v-if="data" class="list-group">
      <li
        v-for="project in data.projects"
        :key="project.id"
        class="list-group-item"
      >
        {{ project.project_name }}
        <DeleteButton db="projects" :id="project.id" />
      </li>
    </ul>

    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Project name</span>
        <input
          type="text"
          class="form-control"
          placeholder="Project name"
          aria-label="Project name"
          aria-describedby="basic-addon1"
          v-model="projectName"
        />
        <select class="form-select" name="" id="" v-model="clientId">
          <option disabled selected value="Client">Client</option>
          <option
            v-for="(client, index) in data.clients"
            :key="client.id"
            :value="client.id"
          >
            {{ client.client_name }}
          </option>
        </select>
        <button
          class="btn btn-outline-dark"
          type="button"
          id="button-addon2"
          @click="handleAdd"
          :disabled="!projectName || !clientId"
        >
          Add Project
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const { data } = storeToRefs(useDataStore());

const projectName = ref("");
const clientId = ref("");

import postData from "@/composables/postData";
import { ref } from "vue";
import DeleteButton from "@/components/DeleteButton.vue";

function handleAdd() {
  postData("projects", {
    project_name: projectName.value,
    client_id: clientId.value,
  });

  projectName.value = "";
  clientId.value = "";
}
</script>

<style lang="css" scoped></style>
