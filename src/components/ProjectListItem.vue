<template>
    <li class="list-group-item d-flex justify-content-between align-items-center" v-if="!isEditing">
        {{ projectName }}
        <div class="d-flex gap-2">
            <EditButton @click="isEditing = true" />
            <DeleteButton table="projects" :id="id" />
        </div>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center gap-3" v-if="isEditing">
        <input v-model="project" class="form-control">
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
    clientId: String
})

const project = ref(props.projectName);
const isEditing = ref(false);
const clientId = ref(props.clientId)

function handleEdit(db, id, data) {
    
  patchData(db, id, data);
  isEditing.value = false;
}
</script>