<template>
    <li class="todo list-group-item p-2 ps-3 mb-2 d-flex flex-column position-relative" :class="todo.todo_status" :data-content="succesMessage">
        <div class="parent-todo">
            <img src="@/assets/icon-drag.svg" class="grab">
            <TodoStatus :disabled="todo.children.length ? true : false" :subtodos="todo.children" :todo="todo" />
            <img class="logo" :src="returnClient(todo.client_id).logo">
            <p>{{ todo.todo_title }}</p>
            <ToDoLink :todo="todo" />
            <button class="border-0" v-if="todoOrDeliverableTimerId !== todo.todo_id" @click="startTimer(todo)">
                <img src="@/assets/play-icon.svg" >
            </button>
            <button class="border-0" v-if="todoOrDeliverableTimerId === todo.todo_id" @click="stopTimer">
                <img src="@/assets/stop-icon-red.svg" alt="">
            </button>
        </div>
        
        <div v-if="todo.children" class="d-flex flex-column gap-1">
            <div v-for="child in todo.children" :key="child.todo_id" class="child-todo">
                <TodoStatus :subtodos="todo.children" :todo="child" class="subtodo"/>
                <p>{{ child.todo_title }}</p>
                <img class="logo" :class="{'opacity-0':  !child.assignee_id || child.assignee_id == user.user_id}" :src="returnUser(child.assignee_id)">
                <button class="border-0" v-if="todoOrDeliverableTimerId !== child.todo_id" @click="startTimer(child)">
                    <img src="@/assets/play-icon.svg" >
                </button>
                <button class="border-0" v-if="todoOrDeliverableTimerId === child.todo_id" @click="stopTimer">
                    <img src="@/assets/stop-icon-red.svg" alt="">
                </button>
            </div>
        </div>
    </li>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from 'vue';

// Stores
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";
import { useTimerStore } from "@/stores/timer";
import { useSessionStore } from "@/stores/session";

// Components
import ToDoLink from "@/components/todos/ToDoLink.vue";
import TodoStatus from "@/components/todos/TodoStatus.vue";

// Refs
const { clients } = storeToRefs(useDataStore());
const { users, user } = storeToRefs(useUserStore());
const { currentSession } = storeToRefs(useSessionStore());
const { startTimerStore, stopTimerStore } = useTimerStore();
const { initialized, todoOrDeliverableTimerId } = storeToRefs(useTimerStore());

const successMessages = [
    'Amazing!', 
    'Hell yeah!', 
    'You rock! 🤟', 
    "BOOM! Nailed it!! 💥",
    'Keep it up!',  
    'Superb!', 
    'High five! 🙏',
    "You're on fire! 🔥",
    "Go get 'em!",
    "You’re a star! ⭐",
    "Victory dance!",
    'More epic than a llama in sunglasses!',
    'What would we do without you?',
    'Task slayer! 🥷',
    'Like a boss! 😎',
    'You made it look easy!',
    'Faster than a squirrel on espresso!',
    'Smashed that like a piñata at a party!',
    'Check, double check! ✅',
    'Wrapped that up like a Christmas present!',
    'Ties is trots op je!',
    'Jens doet een dansje',
    'Tal doet van blijdschap de BBQ aan'
]

const succesMessage = computed(() => successMessages[Math.floor(Math.random() * successMessages.length)])

const props = defineProps({
    todo: Object
})

function returnClient(id) {
    return clients.value.find(c => c.client_id === id)
}

function returnUser(id) {
    return users.value.find(u => u.user_id === id)
}

function startTimer(todo) {
    currentSession.value.title = todo.todo_title
    currentSession.value.project_id = todo.project_id
    currentSession.value.task_id = todo.task_id 
    
    todoOrDeliverableTimerId.value = todo.todo_id

    initialized.value = true
    startTimerStore()
}

function stopTimer() {
    todoOrDeliverableTimerId.value = null
    stopTimerStore()
}
</script>

<style scoped>
.todo {
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    transition: .2s;
}
.todo.Done {
    border: 1px solid var(--paars);
}
.todo.Done::before {
    content: '';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    color: var(--paars);
    inset: 0;
    background-color: #F7F2FC;
    border-radius: var(--br);
    z-index: 1;
}
.todo.Done::after {
    content: attr(data-content);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    color: var(--paars);
    inset: 0;
    scale: 0;
    opacity: 0;
    z-index: 2;
    animation: scale .2s .1s forwards;
}
@keyframes scale {
    100% {
        scale: 1;
        opacity: 1;
    }
}
.parent-todo {
    display: grid;
    grid-template-columns: 20px 40px 45px 1fr 140px 35px;
    align-items: center;
}
.child-todo {
    display: grid;
    grid-template-columns: 85px 1fr 45px 35px;
    align-items: center;
    /* padding-block: 2px; */
}
.child-todo .subtodo {
    margin-left: 42px;
}
.status {
    height: 25px;
    width: 25px;
    border: 1px solid var(--border-licht);
    border-radius: 50%;
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
.logo {
    height: 30px;
    width: 30px;
}
.grab {
    cursor: grab;
}
</style>