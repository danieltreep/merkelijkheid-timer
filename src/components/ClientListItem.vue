<template>
    <li class="list-group-item d-grid align-items-center py-2" v-if="!isEditing">
        <input type="text" class="edit-client-name" v-model="props.client.client_name" @blur="handleEditName()">
        <ColorSelector :color="client.color" :clientId="client.client_id" />
        <div class="d-flex">
            <div 
                v-for="(project, index) in filterProjectsByClient(props.client.client_name)" 
                    :key="index"
                    
                    class="me-2 project"
                    :class="project.project_name === 'General' ? 'pinguin' : '' "
                >
                {{ project.project_name === 'General' ? '🐧' : project.project_name }}
                <DeleteProject :projectId="project.project_id" v-if="project.project_name !== 'General'"/>
            </div>
        </div>
        <button class="more-button">
            Add project
          <img class="ms-3" src="@/assets/add-icon.svg" >
        </button>
        <DeleteClient :clientId="client.client_id" />
  
    </li>
   
</template>
<script setup>
import { ref } from "vue";
import patchData from "@/composables/patchData";
import getData from "@/composables/getData";

import DeleteProject from "@/components/DeleteProject.vue";
import DeleteClient from "@/components/DeleteClient.vue";
import ColorSelector from '@/components/ColorSelector.vue';

import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const { projects } = storeToRefs(useDataStore());
const { updateTable } = useDataStore();

const props = defineProps({
    client: Object
})
const clientName = ref(props.client.client_name)
const client = ref(props.client);
const isEditing = ref(false);


function filterProjectsByClient(client) {
    return projects.value.filter(project => project.client_name === client);
}

async function handleEditName() {
    await patchData('clients', client.value.client_id, {client_name: clientName.value})
    // await updateTable('projects');
    // projects.value = await getData('projects');

}




</script>
<style scoped>

.list-group-item {
    grid-template-columns: 20% 20% 1fr 160px 40px;
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
}
.edit-client-name {
    border: 1px solid transparent;
    /* border: none; */
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
</style>