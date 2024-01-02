<template>
    <li class="list-group-item" v-if="!isEditing">
        {{ client }}
        
        <EditButton @click="isEditing = true" />
        <DeleteButton db="clients" :id="id" />
    </li>
    <li class="list-group-item d-flex" v-if="isEditing">
        <input v-model="client">
        <SaveButton @click="handleEdit('clients', id, {client_name: client} )"/>
    </li>
</template>
<script setup>
import { ref } from "vue";
import patchData from "@/composables/patchData";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import SaveButton from "@/components/SaveButton.vue";

const props = defineProps({
    client: Object,
    id: Number
})

const client = ref(props.client.client_name);
const isEditing = ref(false);

function handleEdit(db, id, data) {
    console.log(db, id, data)
  patchData(db, id, data);
  isEditing.value = false;
}
</script>
<style >
    
</style>