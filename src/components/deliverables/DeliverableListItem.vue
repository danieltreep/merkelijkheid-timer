<template>
    <li class="deliverable list-group-item p-3 mb-2">
        <div class="status d-flex align-items-center justify-content-center" :class="deliverable.status">
            <img src="@/assets/check-icon-white.svg" alt="">
        </div>
        <img class="logo" :src="returnClient(deliverable.client_id).logo">
        <p>{{ deliverable.deliverable_title }}</p>
        <p :class="{hasPassed: isDatePassed(deliverable.due_date)}">{{ dateToDDMMYYYY(deliverable.due_date) }}</p>
        <button class="border-0" :disabled="timerRunning" v-if="todoOrDeliverableTimerId !== deliverable.deliverable_id" @click="startTimer">
            <img src="@/assets/play-icon.svg" alt="">
        </button>
        <button class="border-0" v-if="todoOrDeliverableTimerId === deliverable.deliverable_id" @click="stopTimer">
            <img src="@/assets/stop-icon-red.svg" alt="">
        </button>
        <button @click="addTodo" class="border-0 add-todo">
            <img src="@/assets/icon-add-todo.svg" alt="">
        </button>
    </li>
</template>

<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";
import { useTimerStore } from "@/stores/timer";
import { useUserStore } from "@/stores/user";
import { useSessionStore } from "@/stores/session";

// Composables
import { dateToDDMMYYYY } from '@/composables/functions';
import postData from '@/composables/postData';

// Refs
const { clients, projects } = storeToRefs(useDataStore());
const { user } = storeToRefs(useUserStore());
const { currentSession } = storeToRefs(useSessionStore());
const { timerRunning, todoOrDeliverableTimerId } = storeToRefs(useTimerStore())

const props = defineProps({
    deliverable: Object
})

// Methods
const { startTimerStore, stopTimerStore } = useTimerStore()

function returnClient(id) {
    return clients.value.find(c => c.client_id === id)
}

function returnProject(id) {
    return projects.value.find(p => p.client_id === id && p.project_name === 'General').project_id
}

function isDatePassed(dueDate) {
    const currentDate = new Date();
    const date = new Date(dueDate);
    return date < currentDate;
}

function startTimer() {
    currentSession.value.title = props.deliverable.deliverable_title
    currentSession.value.project_id = returnProject(props.deliverable.client_id)
    currentSession.value.task_id = '15' 

    todoOrDeliverableTimerId.value = props.deliverable.deliverable_id
    startTimerStore()
}

function stopTimer() {
    todoOrDeliverableTimerId.value = null
    stopTimerStore()
}

async function addTodo() {
    const deliverable = props.deliverable;

    const parent_todo_id = await postData('todos', {
        user_id: user.value.user_id,
        client_id: deliverable.client_id,
        todo_title: deliverable.deliverable_title,
        todo_status: deliverable.status,
        todo_link: deliverable.link,
        deliverable_id: deliverable.deliverable_id,
        has_parent: '0',
        parent_deliverable_id: null,
        parent_todo_id: null,
        assignee_id: deliverable.assignee_user_id,
        project_id: returnProject(props.deliverable.client_id),
        task_id: '15'
    })

    if (deliverable.children && deliverable.children.length > 0) {
        for (const child of deliverable.children) {
            await postData('todos', {
                user_id: user.value.user_id,
                client_id: child.client_id,
                todo_title: child.deliverable_title,
                todo_status: child.status,
                todo_link: child.link,
                deliverable_id: child.deliverable_id,
                has_parent: '1',
                parent_deliverable_id: deliverable.deliverable_id,
                parent_todo_id: parent_todo_id,
                assignee_id: child.assignee_user_id,
                project_id: returnProject(props.deliverable.client_id),
                task_id: '15'
            });
        }
    }
}

</script>

<style scoped>
.deliverable {
    display: grid;
    grid-template-columns: 45px 50px 1fr 140px 40px 40px;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    align-items: center;
    position: relative;
}
.status {
    height: 28px;
    width: 28px;
    border: 1px solid var(--border-licht);
    border-radius: 50%;
}
.logo {
    height: 34px;
    width: 34px;
}
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: .7rem .5rem;
    border-radius: 8px;
}
button:hover {
    background-color: var(--hover);
}
.hasPassed {
    color: #EE7170;
}
.Done {
    background-color: var(--paars);
}
.status img {
    scale: 1.3;
}
.add-todo img {
    scale: 1.2;
}
</style>