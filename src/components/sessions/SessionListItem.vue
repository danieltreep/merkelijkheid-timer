<template>
  <li class="list-group-item d-grid py-2 py-lg-0 pb-3 pe-2 position-relative" :style="{backgroundColor: bg}" >
    <input class="taskinput" type="text" v-model="title" @blur="handleBlur" :disabled="!sessionOwned" :class="!sessionOwned ? 'disabled' : ''">
    
    <div class="position-relative d-flex align-items-center projectsection">
      <div class="bolletje me-2" v-if="session.project_id" :style="{ backgroundColor: session?.color ? session.color : '' }"></div>
      <p class="mb-0 me-3" v-if="session.project_id">{{ session?.client_name ? session.client_name : '' }}</p>
      <button class="project" :disabled="!sessionOwned" :class="session?.project_name === 'General' ? 'pinguin' : '' " @click="handleOpenSelector">
        {{ session?.project_name ? (session.project_name === 'General' ? '🐧' : session.project_name) : 'Project' }}<span v-if="session?.taskname">: {{ session?.taskname }}</span>
        
      </button>

      <ProjectSelector v-if="openProjectSelector && sessionOwned" target="changeTask" @handleClick="addProject"/>

    </div>

    <SessionListItemTime :session="session" :isEditable="sessionOwned" />

    <div class="d-flex session-buttons justify-content-center gap-2 align-items-center">
      <button class="play-button" @click="startTimer" :disabled="timerRunning">
        <img src="@/assets/play-icon.svg" alt="Start deze taak">
      </button>
  
      <SessionOptions :session="session" v-if="sessionOwned"/>
      <img class="avatar mx-lg-1" :src="imgUrl?.photo" v-if="!sessionOwned">
    </div>
    

  </li>
</template>
<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer"
import { useUserStore } from "@/stores/user"

// Composables
import patchData from '@/composables/patchData'

// Components
import SessionListItemTime from '@/components/sessions/SessionListItemTime.vue'
import SessionOptions from '@/components/sessions/SessionOptions.vue'
import ProjectSelector from "@/components/projects/ProjectSelector.vue";

// Props
const props = defineProps({
  session: Object,
  bg: String
})

// Refs
const { timerRunning } = storeToRefs(useTimerStore());
const { currentSession, sessionToBePatched } = storeToRefs(useSessionStore());
const { user, users } = storeToRefs(useUserStore());
const openProjectSelector = ref(false);
const title = ref(props.session.title);
const sessionOwned = ref(+props.session.user_id === +user.value.user_id ? true : false) // Bekijk of user id van sessie overeenkomt

const imgUrl = computed(() => users.value.find(user => user.user_id === props.session.user_id))

// Methods
const { startTimerStore } = useTimerStore();

function startTimer() {
  currentSession.value.project_id = props.session.project_id;
  currentSession.value.title = props.session.title;
  currentSession.value.task_id = props.session.task_id;
  startTimerStore()
}

function handleBlur() {
  patchData('sessions', props.session.session_id, {title: title.value})
}

function addProject(project) {
  patchData('sessions', props.session.session_id, {project_id: project.project_id})

  openProjectSelector.value = false
}

function handleOpenSelector() {
  openProjectSelector.value = !openProjectSelector.value
  sessionToBePatched.value = props.session
}
</script>

<style scoped>
li.d-grid {
  grid-template-columns: minmax(max-content, 30%) 35% 4fr 1.1fr 80px;
  align-items: center;
  height: 57px;
}
.border-bottom:last-child {
  border: none;
}
button:disabled {
  /* background-color: var(--tag); */
  color: black;
  cursor: text;
}
.play-button {
  padding: .7rem;
  width: 35px;
  height: 35px;
}
input {
  border: 1px solid transparent;
  padding: .4rem 1rem;
  margin-left: -1rem;
  border-radius: var(--br);
  background-color: transparent;
  color: black;
  cursor: text;
}
input:hover:not(.disabled) {
  border: 1px solid var(--border);
}

.avatar {
  height: 28px;
  width: 28px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  li.d-grid {
    grid-template-columns: 1fr 45px 80px;
    height: auto;
    padding-left: 1rem;
    gap: .5rem 0;
  }
  .taskinput {
    order: 0;
  }
  .duur {
    order: 1;
    text-align: right;
  }
  .projectsection {
    order: 3;
    grid-column: 1 / span 3;
  }
  .session-buttons {
    order: 2;
  }
  .avatar {
    margin-right: 5px;
    margin-left: 7px;
    height: 24px;
    width: 24px;
  }
}
</style>