<template>
    <div class="modal fade" id="editProjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="editProjectModalLabel">Edit project</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Project name" class="project-input w-100" v-model="projectName">

                    <div class="d-flex flex-wrap mt-4 gap-3">
                        <TaskButton v-for="task in tasks" :task="task" @handle-click="handleClick" :selectedIds="selectedTaskIds" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" :disabled="!projectName" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';
import TaskButton from '@/components/TaskButton.vue'

import patchData from "@/composables/patchData";

const { projectToBePatched, tasks } = storeToRefs(useDataStore())

const projectName = ref(projectToBePatched.value.project_name);
const selectedTaskIds = ref([])
const availableTasks = ref(tasks.value)

async function handleConfirm() {
    // console.log(selectedTaskIds.value)

    await patchData('projects', projectToBePatched.value.project_id, {
        project_name: projectName.value,
        available_tasks: JSON.stringify(selectedTaskIds.value)
    });
}

function handleClick(id) {

    if (selectedTaskIds.value.includes(id)) {
        const index = selectedTaskIds.value.indexOf(id);
        selectedTaskIds.value.splice(index, 1);
        projectToBePatched.value.available_tasks = JSON.stringify(selectedTaskIds.value)
    } else {
        selectedTaskIds.value.push(id)
        projectToBePatched.value.available_tasks = JSON.stringify(selectedTaskIds.value)
    }
}

watchEffect(() => {
    projectName.value = projectToBePatched.value.project_name

    if (projectToBePatched.value.available_tasks) {
        selectedTaskIds.value = JSON.parse(projectToBePatched.value.available_tasks)
        const filteredTasks = tasks.value.filter(task => selectedTaskIds.value.includes(task.task_id))
        availableTasks.value = filteredTasks
    }
})

</script>
<style scoped>

.project-input {
    border: 1px solid var(--border);
    padding: .5rem 1rem;
    border-radius: 8px;
    font-size: 16px;
}
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
.project.selected {
    background-color: var(--paars);
    color: white;
}
</style>