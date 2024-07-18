<template >
    <div class="modal fade" id="changeTaskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeTaskModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="changeTaskModalLabel">Change task</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-wrap gap-3">
                    <div 
                        class="project" 
                        v-for="task in availableTasks" 
                        :key="task.task_id"
                        @click="currentTaskId = task.task_id"
                        :class="task.task_id === currentTaskId ? 'selected' : ''"
                    >{{ task.taskname }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref, watchEffect, computed } from 'vue'
import { useDataStore } from "@/stores/data";
import { useSessionStore } from "@/stores/session";

import patchData from "@/composables/patchData";

const { tasks, projectToBePatched } = storeToRefs(useDataStore());
const { sessionToBePatched } = storeToRefs(useSessionStore());

const currentTaskId = ref(sessionToBePatched.value.task_id)
const availableTasksIds = ref(tasks.value)

const availableTasks = ref([])

function handleConfirm() {
    sessionToBePatched.value.task_id = currentTaskId.value
    patchData('sessions', sessionToBePatched.value.session_id, {task_id: currentTaskId.value})
}

watchEffect(() => {
    currentTaskId.value = sessionToBePatched.value.task_id

    if (projectToBePatched.value.available_tasks) {
        availableTasksIds.value = JSON.parse(projectToBePatched.value.available_tasks)
        availableTasks.value = tasks.value.filter(task => availableTasksIds.value.includes(task.task_id))
    }
})

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
.list-group {
    box-shadow: none;
    border: 1px solid var(--border);
}
.project:hover {
    background-color: #D8D8D8;
    cursor: pointer;
}
.project.selected {
    background-color: var(--paars);
    color: white;
}
</style>