<template >
    <div class="modal fade" id="addTodoModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addTodoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-body gap-3">
                    <div>
                        <p><b>To do</b></p>
                        <input type="text" class="form-control ps-3 mt-2" v-model="todoName" placeholder="What is it you want to do?">
                    </div>
                    <p class="mt-4 mb-2" v-if="!selectedProject"><b>Select project</b></p>
                    <div class="project-selector" v-if="!selectedProject">
                        <div class="searchwrapper p-3 pb-0 bg-white sticky-top">
                            <input type="text" class="w-100 search mb-3 " placeholder="Search client" ref="autofocus" v-model="searchterm" >
                        </div>
                        <div class="listwrapper p-3 px-4 pt-0">
                            <div v-for="client in clientsNotArchived" :key="client.id" class="py-2  list-item d-flex ">
                                <div class="d-flex align-items-center  gap-1">
                                    <img :src="client.logo" class="small-logo me-2">
                                    <p class="mb-0 bedrijf">{{ client.client_name }}</p>
                                </div>
                                    
                                <div class="ms-auto d-flex gap-2">
                                    <button 
                                        v-for="(project, index) in filterProjectsByClient(client.client_name)" 
                                        :key="index"
                                        @click="() => handleClick(project)"
                                        class="project"
                                        :class="project.project_name === 'General' ? 'pinguin' : ''"
                                    >
                                        {{ project.project_name === 'General' ? '🐧' : project.project_name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex-flex-column mt-4" v-if="selectedProject">
                        <p><b>Selected project</b></p>

                        <div class="d-flex selected-project align-items-center gap-2 mt-2 mb-4">
                            <img :src="selectedProject.logo" class="small-logo">
                            <p class="mb-0">{{ selectedProject.client_name }}</p>
                            <button 
                                class="ms-4 project"
                                :class="selectedProject.project_name === 'General' ? 'pinguin' : '' "
                            >
                                {{selectedProject.project_name === 'General' ? '🐧' :selectedProject.project_name }}
                            </button>

                            <button class="border-0 bg-transparent change-button" @click="selectedProject = null">Change</button>
                        </div>
                        <p><b>Add task</b></p>
                        <div class="d-flex flex-wrap gap-2 mt-2">
                            <div 
                                class="project" 
                                v-for="task in availableTasks" 
                                :key="task.task_id"
                                @click="currentTaskId = task.task_id"
                                :class="task.task_id === currentTaskId ? 'selected' : ''"
                            >{{ task.taskname }}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0" :disabled="!currentTaskId || !selectedProject || !todoName">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref, watchEffect, computed } from 'vue'

// Stores
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";
import postData from '@/composables/postData';

// Refs
const { projects, searchterm, clientsNotArchived, tasks } = storeToRefs(useDataStore());
const { user } = storeToRefs(useUserStore());
const currentTaskId = ref(null)
const selectedProject = ref(null)
const todoName = ref('')

const availableTasks = computed(() => {
    if (selectedProject.value) {
        const availableTaskIds = JSON.parse(selectedProject.value.available_tasks)
        return tasks.value.filter(task => availableTaskIds.includes(task.task_id))
    } else {
        return []
    }
})

// Methods
async function handleConfirm() {
    await postData('todos', {
        user_id: user.value.user_id,
        client_id: selectedProject.value.client_id,
        todo_title: todoName.value,
        todo_status: null,
        todo_link: null,
        deliverable_id: null,
        has_parent: '0',
        parent_deliverable_id: null,
        parent_todo_id: null,
        assignee_id: null,
        project_id: selectedProject.value.project_id,
        task_id: currentTaskId.value
    })
    selectedProject.value = null
    currentTaskId.value = null
    todoName.value = ''
}

function filterProjectsByClient(client) {
    return projects.value.filter(project => project.client_name === client);
}

function handleClick(project) {
    selectedProject.value = project
    searchterm.value = '';
}

</script>
<style scoped>
.modal-content {
    border-radius: var(--br);
    border: none;
}
.modal-header, .modal-footer {
    border: none;
}
.modal-footer button {
    background-color: var(--paars);
    padding: .5rem 1.5rem;
    border-radius: var(--br);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: .3rem;
}
.project-selector {
    background-color: white;
    border-radius: var(--br);
    width: 100%;
    border: 1px solid var(--border-licht);
    /* box-shadow: var(--bs); */
    max-height: 350px;
    overflow-y: scroll;
}
.bedrijf {
    font-weight: 500;
    font-size: 14px;
}
.search {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: .5rem 1rem;
    outline: none;
    font-size: 14px;
}
.list-item:not(:last-child) {
    border-bottom: 1px solid #EDEEF1;
}
button:hover {
  background-color: #D8D8D8;
}
.project:hover {
    background-color: #D8D8D8;
    cursor: pointer;
}
.project.selected {
    background-color: #EFE3F6;
    border: 2px solid var(--paars);
    color: var(--paars);
}
.project {
    border: 2px solid transparent;
    background-color: var(--tag);
}
.selected-project {
    font-size: 14px;
    font-weight: 500;
}
.change-button {
    color: var(--paars);
    font-weight: 500;
    font-size: 10px;
}
.form-control {
    height: 45px;
    border-radius: 12px;
    font-size: 14px;
}
b {
    font-weight: 500;
    font-size: 14px;
    color: rgb(56, 56, 56);
}
input::placeholder {
    color: #8a8a8a;
}
</style>