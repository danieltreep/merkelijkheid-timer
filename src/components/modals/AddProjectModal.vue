<!-- <template>
    <div class="modal fade" id="addProjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="addProjectModalLabel">Add project</h4>
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
import { storeToRefs } from 'pinia';

// Stores
import { useDataStore } from '@/stores/data';

// Components
import TaskButton from '@/components/TaskButton.vue'

// Composables
import postData from "@/composables/postData";

// Refs
const { currentClientId, tasks } = storeToRefs(useDataStore())
const projectName = ref('');
const selectedTaskIds = ref([])

// Methods
async function handleConfirm() {

    await postData('projects', {
        project_name: projectName.value,
        client_id: currentClientId.value, 
        available_tasks: JSON.stringify(selectedTaskIds.value)
    });

    projectName.value = '';
}

function handleClick(id) {

    if (selectedTaskIds.value.indexOf(id) > -1) {
        
        const index = selectedTaskIds.value.indexOf(id);
        selectedTaskIds.value.splice(index, 1);
    } else {
        selectedTaskIds.value.push(id)
    }
}

// Lifecycle
watchEffect(() => {
    selectedTaskIds.value = tasks.value.map(task => task.task_id)
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

</style> -->