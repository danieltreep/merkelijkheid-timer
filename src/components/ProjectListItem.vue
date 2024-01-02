<template>
    <li class="list-group-item" v-if="!isEditing">
        {{ projectName }}
        
        <EditButton @click="isEditing = true" />
        <DeleteButton db="projects" :id="id" />
    </li>
    <li class="list-group-item d-flex" v-if="isEditing">
        <input v-model="project">
        <select class="form-select" v-model="clientId">
            <option
            v-for="client in clients"
            :key="client.id"
            :value="client.id"
            >
            {{ client.client_name }}
            </option>
        </select>
        <SaveButton @click="handleEdit('projects', id, {project_name: project, client_id: clientId} )"/>
    </li>
</template>
<script setup>
import { ref } from "vue";
import patchData from "@/composables/patchData";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import SaveButton from "@/components/SaveButton.vue";

const props = defineProps({
    projectName: String,
    id: Number,
    clients: Array,
    clientId: Number
})

const project = ref(props.projectName);
const isEditing = ref(false);
const clientId = ref(props.clientId)

function handleEdit(db, id, data) {
    
  patchData(db, id, data);
  isEditing.value = false;
}
</script>
<style >
    
</style>