<template>
  <div class="timerbar d-grid align-items-center py-1 pe-2 my-4 mb-5">
    <input
      type="text"
      v-model="currentSession.title"
      placeholder="Waar werk je aan?"
      class="ps-0"
    />

    <div class="position-relative d-flex align-items-center">
      <div class="bolletje me-2" v-if="currentSession.project_id" :style="{ backgroundColor: currentProject?.color ? currentProject.color : '' }"></div>
      <p class="mb-0 me-3" v-if="currentSession.project_id">{{ currentProject?.client_name ? currentProject.client_name : '' }}</p>
      <button class="add-project-button" :class="currentProject?.project_name === 'General' ? 'pinguin' : '' " @click="openProjectSelector = !openProjectSelector">
        {{ currentProject?.project_name ? (currentProject.project_name === 'General' ? '🐧' : currentProject.project_name) : 'Project' }}
        <img src="@/assets/add-icon.svg" v-if="!currentSession.project_id">
      </button>

      <ProjectSelector v-show="openProjectSelector" @handleClick="addProject"/>

    </div>

    <Timer v-if="!editing || timerRunning" @initialized="initialized = true" :initialized="initialized"/>
    <TimerEditable v-else="editing" />

    <div class="options d-flex flex-column justify-content-around align-items-center ms-2 h-100">
      <button class="clock" @click="handleSwitch(false)" :disabled="currentSession.time_elapsed !== '00:00:00'">
        <img v-if="editing" src="@/assets/clock-icon.svg" >
        <img v-else src="@/assets/clock-icon-paars.svg" >
      </button>
      <button class="list" @click="handleSwitch(true)" :disabled="currentSession.time_elapsed !== '00:00:00'">
        <img v-if="!editing" src="@/assets/list-icon.svg" >
        <img v-else src="@/assets/list-icon-paars.svg" >
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import Timer from "@/components/Timer.vue";
import TimerEditable from "@/components/TimerEditable.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";

const { currentSession, currentProject } = storeToRefs(useSessionStore());
const { timerRunning } = storeToRefs(useTimerStore());

const initialized = ref(false) // Houdt bij of de timer al geinitieerd is
const editing = ref(false);
const openProjectSelector = ref(false);

function addProject(project) {
  currentSession.value.project_id = project.project_id
  openProjectSelector.value = false
}

// Haal stopped at waarde weg als er weer terug naar de timer wordt geswitched. Anders wordt einddatum al verzonden bij het starten.
function handleSwitch(boolean) {
  editing.value = boolean;
  
  if (!boolean) {
    currentSession.value.stopped_at = null
  }
}

</script>

<style scoped>
.timerbar {
  background-color: white;
  box-shadow: var(--bs);
  border-radius: var(--br);
  font-size: 14px;
  grid-template-columns: minmax(max-content, 30%) 1fr 1fr 30px;
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
