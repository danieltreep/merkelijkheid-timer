<template >
    <div class="suggested-sessions position-absolute px-2 pt-2 overflow-scroll bg-white" v-if="filteredSessions.length">
        
        <li v-for="session in filteredSessions" :key="session.session_id" class="list-group-item d-grid p-2 py-3 py-md-2 px-3 align-items-center" @click="() => handleClick(session)" >
            {{ session.title }}
            <div class="position-relative d-flex align-items-center projectsection">
                <img :src="session.logo" class="small-logo me-2">
                <p class="mb-0 me-3 client-name" >{{ session.client_name }}</p>
                <div class="project add-project-button me-2" :class="session.project_name === 'General' ? 'pinguin' : '' ">
                    <div class="no-overflow">
                        {{ session.project_name === 'General' ? '🐧' : session.project_name }}: &nbsp; <span>{{ session.taskname }}</span>
                    </div>
                </div>
            </div>
        </li>
       
    </div>
</template>
<script setup >
import { storeToRefs } from "pinia";
import { computed } from 'vue'

// Stores
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer";

// Props and emits
const emit = defineEmits(['handleClick'])
const props = defineProps({
    search: String
})

// Refs
const { currentSession, finishedSessions } = storeToRefs(useSessionStore());
const { startTimerStore } = useTimerStore()

const stackedSessions = computed(() => {
  let sessionGroups = [];

    const sessionIndicators = finishedSessions.value.map(session => {
        return {
            title: session.title, 
            project_id: session.project_id, 
            task_id: session.task_id,
            color: session.color,
            project_name: session.project_name,
            taskname: session.taskname,
            client_name: session.client_name,
            logo: session.logo
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

// Methods
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
    
    setTimeout(() => {
        emit('handleClick')
    }, 200)
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
    width: 720px;
    max-height: 300px;
    overflow-y: scroll;
    border-bottom: .6rem solid white;
}
.list-group-item {
    padding-left: 0;
    grid-template-columns: 290px 1fr;
    border-radius: 8px;
    cursor: pointer;
    /* gap: 1rem; */
    /* border-bottom: 1px solid #D8D8D8; */
}
.list-group-item:hover {
    background-color: #fafafa;
}
.add-project-button, .client-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* max-width: 100%; */
}
.no-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 200px;
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