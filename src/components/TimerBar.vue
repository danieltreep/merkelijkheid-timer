<template>
  <div class="timerbar d-grid align-items-center py-1 pe-2 my-4 mb-5">
    <input
      type="text"
      v-model="currentSession.title"
      placeholder="Waar werk je aan?"
      class="ps-0"
    />

    <div class="position-relative d-flex align-items-center">
      <div class="bolletje me-2" v-if="currentSession.project_id" :style="{ backgroundColor: bolletjeColor }"></div>
      <p class="mb-0 me-3" v-if="currentSession.project_id">{{ client }}</p>
      <button class="add-project-button" @click="openProjectSelector = !openProjectSelector">
        {{ buttonText }}
        <img src="@/assets/add-icon.svg" v-if="!currentSession.project_id">
      </button>

      <ProjectSelector v-show="openProjectSelector" @handleClick="addProject"/>

    </div>

    <Timer @reset="handleReset"/>

    <div class="options d-flex flex-column justify-content-around align-items-center ms-2 h-100">
      <button class="clock">
        <img v-if="!clock" @click="clock = true" src="@/assets/clock-icon.svg" >
        <img v-if="clock" @click="clock = true" src="@/assets/clock-icon-paars.svg" >
      </button>
      <button class="list">
        <img v-if="clock" @click="clock = false" src="@/assets/list-icon.svg" >
        <img v-if="!clock" @click="clock = false" src="@/assets/list-icon-paars.svg" >
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import Timer from "@/components/Timer.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";

const { currentSession } = storeToRefs(useDataStore());

const clock = ref(true);
const openProjectSelector = ref(false);
const buttonText = ref('Project');
const client = ref('');
const bolletjeColor = ref('')

function addProject(project) {
  buttonText.value = project.project_name;
  client.value = project.client_name;
  bolletjeColor.value = project.color;
  currentSession.value.project_id = project.project_id
  openProjectSelector.value = false
}

function handleReset() {
  buttonText.value = 'Project';
  client.value = '';
}

</script>

<style scoped>
.timerbar {
  background-color: white;
  box-shadow: var(--bs);
  border-radius: var(--br);
  font-size: 14px;
  grid-template-columns: minmax(max-content, 35%) 1fr 200px 30px;
  padding-left: 2rem;
  height: 50px;
}

input {
  border: none;
  outline: none;
  font-size: 14px;
}
.options button {
  border: none;
  background-color: transparent;
  display: flex;
}
.clock img {
  height: 13px;
  width: 13px;
}
.add-project-button {
  border: none;
  background-color: var(--tag);
  border-radius: 30px;
  width: fit-content;
  padding-inline: 1.5rem;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 32px;
}
.add-project-button:hover {
  background-color: #C2C2C260;
}
</style>
