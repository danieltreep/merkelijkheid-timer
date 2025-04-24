<template>
    <button class="border-0" :disabled="timerRunning" @click="startTimer()">
        <img src="@/assets/play-icon.svg" alt="">
    </button>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

// Stores
import { useDataStore } from "@/stores/data";
import { useTimerStore } from "@/stores/timer";
import { useSessionStore } from "@/stores/session";

// Props
const props = defineProps({
    deliverable: Object
})

// Refs
const { timerRunning } = storeToRefs(useTimerStore())
const { projects } = storeToRefs(useDataStore());
const { currentSession } = storeToRefs(useSessionStore());

// Router
const router = useRouter()

// Methods
const { startTimerStore } = useTimerStore()

function returnProject(id) {
    return projects.value.find(p => p.client_id === id && p.project_name === 'General').project_id
}

function startTimer() {
    currentSession.value.title = props.deliverable.deliverable_title
    currentSession.value.project_id = props.deliverable.project_id || returnProject(props.deliverable.client_id)
    currentSession.value.task_id = props.deliverable.task_id || '15' 

    startTimerStore()

    router.push({ name: 'home'})
}
</script>

<style scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: .7rem .5rem;
    border-radius: 8px;
    width: 40px;
}
button:hover {
    background-color: var(--hover);
}
</style>