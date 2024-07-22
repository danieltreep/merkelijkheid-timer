<template>
  <div class="timerbar d-md-grid align-items-center py-2 pe-2 my-4 mb-5 position-relative">

    
      <input
        type="text"
        v-model="currentSession.title"
        placeholder="What are you working on?"
        class="ps-0"
        @click="showSuggestedSessions = true"
        @blur="handleBlur"
      />
  
      <SuggestedSessions :search="currentSession.title" v-if="showSuggestedSessions" @handleClick="showSuggestedSessions = false"/>

    <div class="position-relative d-flex align-items-center">
      <div class="bolletje me-2 d-none d-md-inline" v-if="currentSession.project_id" :style="{ backgroundColor: currentProject?.color ? currentProject.color : '' }"></div>
      <p class="mb-0 me-3 d-none d-md-inline" v-if="currentSession.project_id">{{ currentProject?.client_name ? currentProject.client_name : '' }}</p>
      
      <button class="add-project-button me-2" :class="currentProject?.project_name === 'General' ? 'pinguin' : '' " @click="openProjectSelector = !openProjectSelector">
        <div class="d-flex align-items-center" v-if="currentProject?.project_name">
          <span class="d-none d-md-inline">{{ currentProject.project_name === 'General' ? '🐧' : currentProject.project_name }}:&nbsp;</span>
          <span> {{ findMatchingTask(currentSession?.task_id) }} </span>
        </div>
        <span class="d-none d-md-inline" v-if="!currentProject?.project_name">Project</span>
        <img src="@/assets/add-icon.svg" v-if="!currentSession.project_id">
        
      </button>

      <ProjectSelector v-show="openProjectSelector"  @handleClick="addProject" target="addTask" />

    </div>

    <Timer v-if="!editing || timerRunning" @initialized="initialized = true" :initialized="initialized"/>
    <TimerEditable v-else="editing" />

    <div class="options d-flex flex-column justify-content-around align-items-center ms-2 h-100 d-none d-md-flex">
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
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import Timer from "@/components/Timer.vue";
import TimerEditable from "@/components/TimerEditable.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";
import SuggestedSessions from "@/components/SuggestedSessions.vue";

const { currentSession, currentProject } = storeToRefs(useSessionStore());
const { timerRunning } = storeToRefs(useTimerStore());
const { tasks } = storeToRefs(useDataStore());

const initialized = ref(false) // Houdt bij of de timer al geinitieerd is
const editing = ref(false);
const openProjectSelector = ref(false);
const showSuggestedSessions = ref(false)

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

function findMatchingTask(id) {
  const matchingTask = tasks.value.find(task => +task.task_id === +id)
  if (matchingTask !== undefined) {
    return matchingTask.taskname;
  }
}

function handleBlur() {
  setTimeout(() => {
    showSuggestedSessions.value = false
  }, 100);
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
  /* height: 50px; */
}

input {
  border: none;
  outline: none;
  font-size: 14px;
  min-width: none;
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

@media (max-width: 768px) {
  .timerbar {
    display: flex;
    justify-content: space-between;
    /* grid-template-columns: .5fr 1fr 1.2fr; */
    padding-left: 1rem;
  }
  input {
    min-width: 100px;
  }
}
</style>
