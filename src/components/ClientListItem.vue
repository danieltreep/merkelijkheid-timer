<template>
    <li class="list-group-item d-grid align-items-center py-2 border-bottom"  v-if="!isEditing" :class="archived ? 'archived' : ''">
        <input v-if="!archived" type="text" class="edit-client-name" v-model="clientName" @blur="handleEditName()">
        <ColorSelector v-if="!archived" :color="client.color" :clientId="client.client_id" />

        <p class="mb-0" v-if="archived">{{ clientName }}</p>
        <div class="bolletje" v-if="archived" :style="{backgroundColor: client.color}"></div>

        <div class="d-flex">
            <div 
                v-for="(project, index) in filterProjectsByClient" 
                    :key="index"
                    data-bs-toggle="modal" data-bs-target="#editProjectModal"
                    @click="projectToBePatched = project"
                    class="me-2 project"
                    :class="project.project_name === 'General' ? 'pinguin' : '' "
                >
                {{ project.project_name === 'General' ? '🐧' : project.project_name }}
                <DeleteProjectButton :projectId="project.project_id" v-if="project.project_name !== 'General' && !archived"/>
            </div>
        </div>
        <AddProjectButton :clientId="client.client_id" v-if="!archived"/>
        <ArchiveClientButton :clientId="client.client_id" :archived="archived"/>
        <DeleteClientButton :clientId="client.client_id" />
    </li>
   
</template>
<script setup>
import { ref, computed } from "vue";
import patchData from "@/composables/patchData";

import DeleteProjectButton from "@/components/DeleteProjectButton.vue";
import DeleteClientButton from "@/components/DeleteClientButton.vue";
import ArchiveClientButton from "@/components/ArchiveClientButton.vue";
import ColorSelector from '@/components/ColorSelector.vue';
import AddProjectButton from '@/components/AddProjectButton.vue';

import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const { projects, projectToBePatched } = storeToRefs(useDataStore());

const props = defineProps({
    client: Object,
    archived: Boolean
})

const clientName = ref(props.client.client_name)
const client = ref(props.client);
const isEditing = ref(false);

const filterProjectsByClient = computed(() => {
    return projects.value.filter(project => project.client_id === client.value.client_id);
})

async function handleEditName() {
    await patchData('clients', client.value.client_id, {client_name: clientName.value})
}

</script>
<style scoped>
.project {
    background-color: var(--tag);
    padding: .4rem 1rem .4rem 1.2rem;
    border-radius: 30px;
    width: fit-content;
    font-size: 12px;
    font-weight: 500;
    border: none;
    display: flex;
}
.project:hover {
    background-color: #D8D8D8;
    cursor: pointer;
}
.edit-client-name {
    border: 1px solid transparent;
    padding: .5rem 1rem;
    margin-left: -1rem;
    margin-right: 1rem;
    border-radius: var(--br);
}
.edit-client-name:hover {
    border: 1px solid var(--border);
}
.pinguin {
    padding: .2rem 1rem;
    font-size: 16px;
}
.bolletje {
    height: 15px;
    width: 15px;
}
</style>