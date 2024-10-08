<template>
    
    <div class="accordion-item" v-if="sessions.length > 1">
        <div class="accordion-header pe-2 py-3 py-md-2 ">
            <div class="position-relative d-flex align-items-center">
                <button v-if="sessions.length > 1" class="btn show-content-button d-flex align-items-center me-md-3 me-2 gap-2 justify-content-center collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#accordion-${replaceSpaces(sessionsArrayKey)}`" aria-expanded="true" :aria-controls="`accordion-${replaceSpaces(sessionsArrayKey)}`">
                    {{ sessions.length }} 
                    <img src="@/assets/chevron-icon.svg" alt="">
                </button>
                <div class="session-title">{{ sessions[0].title }}</div>
            </div>
            <div class="position-relative d-flex align-items-center projectsection">
                <img :src="sessions[0].logo" class="small-logo me-2">
                <p class="mb-0 me-3" v-if="sessions[0].project_id">{{ sessions[0]?.client_name ? sessions[0].client_name : '' }}</p>
                <div class="project" :class="sessions[0]?.project_name === 'General' ? 'pinguin' : '' " >
                    {{ sessions[0]?.project_name ? (sessions[0].project_name === 'General' ? '🐧' : sessions[0].project_name) : 'Project' }}<span v-if="sessions[0].taskname">: {{ sessions[0].taskname }}</span>
                </div>
            </div>      

            <div class="time align-items-center gap-1 d-none d-md-grid">
                <img src="@/assets/clock-icon.svg">
                <div type="text">{{ sessions[sessions.length - 1].created_at.slice(11, -3)}}</div>
                <div>-</div>
                <div type="text" >{{ sessions[0].stopped_at.slice(11, -3)}}</div>
            </div>

            <div class="duur d-flex align-items-center">{{reduceTimeElapsed(sessions)}}</div>

            <button class="play-button" @click="startTimer" :disabled="timerRunning">
                <img src="@/assets/play-icon.svg" alt="Start deze taak">
            </button>
            
        </div>
        <div :id="`accordion-${replaceSpaces(sessionsArrayKey)}`" class="accordion-collapse collapse">
            <div class="accordion-body p-0">
                <SessionListItem v-for="session in sessions" :key="session.session_id" :session="session" :bg="'#F9F9F9'"/>
            </div>
        </div>
    </div>

    <div v-if="sessions.length === 1" class="item">
        <SessionListItem v-for="session in sessions" :key="session.session_id" :session="session" :bg="'#fff'"/>
    </div>
    

</template>
<script setup>
import { storeToRefs } from 'pinia'

// Stores
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer"

// Components
import SessionListItem from '@/components/sessions/SessionListItem.vue'

// Props
const props = defineProps({
    sessions: Array,
    sessionsArrayKey: String
})

// Refs
const { timerRunning } = storeToRefs(useTimerStore());
const { currentSession } = storeToRefs(useSessionStore());

// Methods
const { startTimerStore } = useTimerStore();

function startTimer() {
  currentSession.value.project_id = props.sessions[0].project_id;
  currentSession.value.title = props.sessions[0].title;
  currentSession.value.task_id = props.sessions[0].task_id;

  startTimerStore()
}

function reduceTimeElapsed(sessions) {
    let totalSeconds = 0;

    sessions.forEach(session => {
        const [hours, minutes, seconds] = session.time_elapsed.split(':').map(Number);
        totalSeconds += (hours * 3600) + (minutes * 60);
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const totalMinutes = Math.floor(totalSeconds / 60);

    const formattedTime = `${String(totalHours)}:${String(totalMinutes).padStart(2, '0')}`;
    return formattedTime;
}

function replaceSpaces(string) {
    // Replace spaces with hyphens
    let result = string.split(' ').join('-');
    
    // Remove characters that are not allowed in CSS selectors
    result = result.replace(/[^a-zA-Z0-9-_]/g, '');

    return result;
}
</script>
<style scoped>
.accordion {
    border-radius: 0;
    box-shadow: none;
}
.accordion-item {
    border-radius: 0;
    /* overflow: hidden; */
    border: none;
    border-bottom: 1px solid #dee2e6;
}
.item:not(:last-child) {
    border-bottom: 1px solid #dee2e6;
}
.accordion-header {
    grid-template-columns: minmax(10%, 30%) 35% 4fr 1.1fr 80px;
    display: grid;
    font-size: 14px;
    padding-block: .5rem;
    height: 57px;
    background-color: white;
    padding-inline: 2rem 1rem;
    align-items: center;
}

.accordion-body {
    background-color: #F9F9F9;
    padding-inline: 0;
}
.item:last-child .list-group-item{
  border-radius: 0 0 var(--br) var(--br);
  border-bottom: none !important;
}
.list-item-accordion {
    background-color: transparent;
    padding-right: 1.8rem;
    grid-template-columns: 55% 1fr 1fr 55px;
}
.show-content-button {
    border: 1px solid var(--border);
    width: 50px;
    border-radius: 30px;
    font-size: 12px;
}
.duur {
  font-size: 20px;
  font-weight: 500;
}
.btn img {
    transform: rotate(-180deg);
    transition: .3s;
}
.btn.collapsed img {
    transform: rotate(0);
}
.avatar {
    height: 22px;
    width: 22px;
    border-radius: 50%;
}
.play-button {
    width: 35px;
    height: 35px;
    /* margin-left: 10px; */
}
.time {
  display: grid;
  grid-template-columns: 25px 45px 15px 50px;
}
.accordion-item:last-child {
  border-radius: 0 0 var(--br) var(--br);
  /* border: 2px solid black; */
}
.accordion-item:last-child .accordion-body,
.accordion-item:last-child .accordion-header {
  border-radius: 0 0 var(--br) var(--br);

}
.accordion-item:last-child .list-group-item:last-child {
  border-radius: 0 0 var(--br) var(--br);
}
.session-title {
    overflow: hidden;
    /* max-width: 35%; */
    white-space: nowrap;
    margin-right: 1rem;
    position: relative;
}
.bolletje {
    position: relative;
}
.bolletje::after {
    content: '';
    position: absolute;
    height: 30px;
    width: 60px;
    background-color: black;
    background: linear-gradient(-90deg,#ffffff, #FFFFFF00);
    top: -10px;
    left: -60px;
}

@media (max-width: 768px) {
    .accordion-header {
        padding-left: 1rem;
        grid-template-columns: 1fr 45px 80px;
        gap: .5rem 0;
        height: auto;
        /* overflow: hidden; */
    }
    .taskinput {
        order: 0;
    }
    .duur {
        order: 1;
        text-align: right;
    }
    .projectsection {
        order: 4;
        grid-column: 1 / span 3;
    }
    .play-button {
        order: 2;
        margin-left: 11px;
    }
    .avatar {
        height: 23px;
        width: 23px;
    }
    .session-title {
        white-space: wrap;
        overflow: hidden;
        max-width: 60%;
    }
}
</style>