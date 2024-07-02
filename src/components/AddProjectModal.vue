<template>
    <div class="modal fade" id="addProjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="addProjectModalLabel">Add project</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Project name" class="project-input w-100" v-model="projectName">
                </div>
                <div class="modal-footer">
                    <button type="button" :disabled="!projectName" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';

import postData from "@/composables/postData";

const { currentClientId } = storeToRefs(useDataStore())
const projectName = ref('');

async function handleConfirm() {
    await postData('projects', {project_name: projectName.value, client_id: currentClientId.value});
    
    projectName.value = '';
}

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
</style>