<template >
    <div class="suggested-sessions position-absolute px-2 pt-2 overflow-scroll bg-white" v-if="filteredSessions.length">
        
        <li class="list-group-item d-grid p-2 py-3 py-md-2 px-3 align-items-center" @click="() => handleClick(session)" v-for="session in filteredSessions" :key="session.session_id">
            {{ session.title }}
            <div class="position-relative d-flex align-items-center projectsection">
                <div class="bolletje me-2" :style="{ backgroundColor: session.color }"></div>
                <p class="mb-0 me-3" >{{ session.client_name }}</p>
                <div class="project" :class="session.project_name === 'General' ? 'pinguin' : '' ">
                    {{ session.project_name === 'General' ? '🐧' : session.project_name }}: &nbsp; <span>{{ session.taskname }}</span>
                </div>
            </div>
        </li>
       
    </div>
</template>
<script setup >
import { useDataStore } from "@/stores/data";
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";

import { computed } from 'vue'

const { sessions } = storeToRefs(useDataStore());
const { currentSession } = storeToRefs(useSessionStore());
const { startTimerStore } = useTimerStore()

const props = defineProps({
    search: String
})

const emit = defineEmits(['handleClick'])

const stackedSessions = computed(() => {
  let sessionGroups = [];

    const sessionIndicators = sessions.value.map(session => {
        return {
            title: session.title, 
            project_id: session.project_id, 
            task_id: session.task_id,
            color: session.color,
            project_name: session.project_name,
            taskname: session.taskname,
            client_name: session.client_name
        }
    })
  
    sessionIndicators.forEach(session => {
        if (!isObjectInArray(sessionGroups, session)) {
            sessionGroups.push(session)
        }
    });
    
    return sessionGroups;
})

const filteredSessions = computed(() => {

    if (props.search === null) {
        return stackedSessions.value
    } else {
        return stackedSessions.value.filter(session => session.title.toLowerCase().includes(props.search))
    }
})

function isObjectInArray(array, object) {
    return array.some(function(element) {
        return Object.keys(object).every(function(key) {
            return element[key] === object[key];
        });
    });
}

function handleClick(session) {
    currentSession.value.title = session.title
    currentSession.value.project_id = session.project_id
    currentSession.value.task_id = session.task_id 

    startTimerStore()
    // console.log(session)
    emit('handleClick')
}
</script>
<style scoped>
.suggested-sessions {
    position: absolute;
    left: .5rem;
    top: calc(100%);
    background-color: white;
    border-radius: 0 0 var(--br) var(--br);
    box-shadow: var(--bs);
    z-index: 1;
    width: 560px;
    max-height: 300px;
    overflow-y: scroll;
    border-bottom: .6rem solid white;
}
.list-group-item {
    padding-left: 0;
    grid-template-columns: 170px 1fr;
    border-radius: 8px;
    cursor: pointer;
    /* gap: 1rem; */
    /* border-bottom: 1px solid #D8D8D8; */
}
.list-group-item:hover {
    background-color: #fafafa;
}


@media (max-width: 768px) {
    .suggested-sessions {
        left: 0;
        width: 100%;
    }
    .list-group-item {
        grid-template-columns: 1fr;
        gap: .5rem;
        border-bottom: 1px solid var(--border);
        border-radius: 0;
    }
    .list-group-item:last-of-type {
        border: none;
    }
}
</style>