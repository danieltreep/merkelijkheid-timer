<template>
  <li class="list-group-item d-grid py-2 pe-2 position-relative">
    <input type="text" v-model="title" @blur="handleBlur">
    
    <div class="position-relative d-flex align-items-center">
      <div class="bolletje me-2" v-if="session.project_id" :style="{ backgroundColor: session?.color ? session.color : '' }"></div>
      <p class="mb-0 me-3" v-if="session.project_id">{{ session?.client_name ? session.client_name : '' }}</p>
      <button class="project" :class="session?.project_name === 'General' ? 'pinguin' : '' " @click="openProjectSelector = !openProjectSelector">
        {{ session?.project_name ? (session.project_name === 'General' ? '🐧' : session.project_name) : 'Project' }}
      </button>

      <ProjectSelector v-show="openProjectSelector" @handleClick="addProject"/>

    </div>
    <SessionListItemTime :session="session" />

    <button class="play-button" @click="startTimer" :disabled="timerRunning">
      <img src="@/assets/play-icon.svg" alt="Start deze taak">
    </button>

    <SessionOptions :session="session" />

  </li>
</template>
<script setup>
import { ref } from "vue";
import {  storeToRefs } from "pinia";
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer"
import SessionListItemTime from '@/components/SessionListItemTime.vue'
import SessionOptions from '@/components/SessionOptions.vue'
import ProjectSelector from "@/components/ProjectSelector.vue";
import patchData from '@/composables/patchData'

const props = defineProps({
  session: Object,
})

const { startTimerStore } = useTimerStore();
const { timerRunning } = storeToRefs(useTimerStore());
const { currentSession } = storeToRefs(useSessionStore());
const openProjectSelector = ref(false);

const title = ref(props.session.title)

function startTimer() {
  currentSession.value.project_id = props.session.project_id;
  currentSession.value.title = props.session.title;
  startTimerStore()
}

function handleBlur() {
  patchData('sessions', props.session.session_id, {title: title.value})
}

function addProject(project) {
  patchData('sessions', props.session.session_id, {project_id: project.project_id})

  // currentSession.value.project_id = project.project_id
  openProjectSelector.value = false
}
</script>

<style scoped>
li.d-grid {
  grid-template-columns: minmax(max-content, 30%) 35% 4fr 1.1fr 40px 40px;
  align-items: center;
}


input {
  border: 1px solid transparent;
  padding: .4rem 1rem;
  margin-left: -1rem;
  margin-right: 1rem;
  border-radius: var(--br);
}
input:hover {
  border: 1px solid var(--border);
}
</style>