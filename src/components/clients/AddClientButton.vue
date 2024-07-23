<template>
    <button class="add-client-button" data-bs-toggle="modal" data-bs-target="#addClientModal">
        <img class="me-md-2"  src="@/assets/plus-icon-white.svg">
        <span class="d-none d-md-inline">Add client</span>
        
    </button>

    <div class="modal fade" id="addClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="addClientModalLabel">Add client</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Client name" class="client-input w-100" v-model="clientName">
                    <div class="d-flex mt-4">
                        <div 
                            v-for="(project, index) in projects" 
                                :key="index"
                                class="me-2 project"
                                :class="project === 'General' ? 'pinguin' : '' "
                            >
                            {{ project === 'General' ? '🐧' : project }}
                            <img src="@/assets/cross-icon.svg" class="delete-project ms-1" v-if="project !== 'General'" @click="() => handleDeleteProject(project)">
                        </div>
                        <div class="add-project-button d-flex align-items-center p-1 px-2">
                            <input type="text" placeholder="Add project" v-model="projectName" @keyup.enter="handleAddProject()">
                            <img class="ms-3" src="@/assets/add-icon.svg" @click="handleAddProject()" >
                        </div>
                    </div>
                    <div class="colors d-flex align-items-center">
                        <p class="mb-0 me-3">Tag color</p>
                        <div 
                        v-for="color in colors" 
                        :key="color" 
                        class="bolletje me-2" 
                        :style="{backgroundColor: color}" 
                        @click="handleColorChange(color)"
                        >
                            <img class="check" v-if="color === colorRef" src="@/assets/check-icon.svg">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" :disabled="!clientName" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'

// Stores
import { useDataStore } from '@/stores/data'

// Composables
import postData from "@/composables/postData";

// Refs
const { tasks } = storeToRefs(useDataStore())
const clientName = ref('')
const projects = ref(['General'])
const projectName = ref('');
const colors = ref(['#F8D84A', '#C2B5ED', '#F09D37', '#EE732F', '#EB592A']);
const colorRef = ref('#F8D84A')

// Methods
function handleAddProject() {
    if (projectName.value) {
        projects.value.push(projectName.value);
        projectName.value = ''
    }
}

function handleDeleteProject(project) {
    projects.value = projects.value.filter(p => p !== project)
}

async function handleConfirm() {
    const clientId = await postData('clients', {client_name: clientName.value, color: colorRef.value, is_archived: 0});
    
    for (const project of projects.value) {
        await postData('projects', {
            project_name: project, 
            client_id: clientId, 
            available_tasks: JSON.stringify(tasks.value.map(task => task.task_id))
        });
    }

    clientName.value = '';
}

function handleColorChange(color) {
    colorRef.value = color;
}

</script>
<style scoped>

.add-project-button {
    border: 1px solid var(--border);
    border-radius: 30px;
    font-size: 13px;
    font-weight: 500;
}
.add-project-button:hover {
    border: 1px solid var(--paars);
}
.add-project-button input {
    border: 0;
    padding-inline: .5rem;
    background-color: transparent;
    width: 100px;
    min-width: 100px;
    outline: none;
}
.add-project-button img {
    cursor: pointer;
}
.add-project-button button {
    border: 0;
    background-color: transparent;
}
.add-client-button {
  background-color: var(--paars);
  border: 1px solid var(--paars);
  color: white;
  padding: .5rem 1.5rem;
  border-radius: var(--br);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: .3rem;
}
.client-input {
    border: 1px solid var(--border);
    padding: .5rem 1rem;
    border-radius: 8px;
    font-size: 16px;
}
.modal-content {
    border-radius: var(--br);
    border: none;
}
.project {
    background-color: var(--tag);
    padding: .4rem 1rem .4rem 1.2rem;
    border-radius: 30px;
    width: fit-content;
    font-size: 12px;
    font-weight: 500;
    border: none;
    display: flex;
    align-items: center;
    white-space: nowrap;
}
.delete-project {
    cursor: pointer;
}
.pinguin {
    padding: .2rem 1rem;
    font-size: 16px;
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
.colors {
    margin-top: 2rem;
    font-size: 16px;
    font-weight: 500;
}
.bolletje {
    height: 15px;
    width: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check {
    margin-left: 1px;
    margin-top: 1px;
}
</style>