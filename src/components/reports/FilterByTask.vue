<template>
    <div class="position-relative ms-auto mt-auto pe-4">
        <button class="d-flex align-items-center open-options" @click="show = !show">
            {{ activeTask }}
            <img class="ms-2" src="@/assets/chevron-icon.svg">
        </button>
    
        <div class="task-tooltip position-absolute" v-if="show">
            <ul class="list-group p-2" >
                <li class="d-flex align-items-center gap-2 task" @click="handleClick({taskname: 'All tasks', task_id: null})" :style="{borderLeft: `3px solid transparent`}">
                    <div class="taskcolor" :style="{background: 'transparent'}"></div>
                    All tasks
                </li>

                <li 
                    v-for="task in tasks"
                    class="d-flex align-items-center gap-2 task" 
                    @click="handleClick(task)"
                >
                    <div class="taskcolor" :style="{background: task.taskcolor}"></div>
                    {{ task.taskname }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['changeTaskFilter'])
const props = defineProps({
    tasks: Array
})

// Refs
const show = ref(false)

const activeTask = ref('All tasks')

// Methods
function handleClick(task) {
    activeTask.value = task.taskname
    emit('changeTaskFilter', task)
    show.value = false
}
</script>

<style scoped>

.task-tooltip {
    background-color: white;
    right: 20%;
    width: 180px;
    z-index: 10;
    top: calc(100% + 15px);
    border-radius: var(--br);
    border: 1px solid #E8E8E8;
}

button.open-options {
    background-color: white;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    padding: .5rem 1rem;
    height: 34px;
}
.task-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: white;
    top: -7px;
    right: 33px;
    border-left: 1px solid var(--border);
    border-top: 1px solid var(--border);
    transform: rotate(45deg);
    border-radius: 3px 0 0 0;
}

.avatar-inline {
    height: 27px;
    width: 27px;
    border-radius: 50%;
}
.avatar-wrapper {
    border: 2px solid transparent;
    padding: 1px;
    border-radius: 50%;
}
button.select-button {
    background-color: #A53EF415;
    color: var(--paars);
    font-weight: 500;
    width: 100%;
}
.task {
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: .3rem .3rem;
    width: 100%;
    border-radius: 8px;
}

.task:hover {
    background-color: var(--hover);
}
.taskcolor {
    border-radius: 4px;
    width: 4px;
    height: 24px;
    margin-right: 4px;
}

.task:hover .avatar-wrapper {
    border: 2px solid var(--paars);
}
.avatar-wrapper.added {
    border: 2px solid var(--paars);
}
.small-avatar {
    height: 20px;
    width: 20px;
    margin-right: 8px;
}
</style>