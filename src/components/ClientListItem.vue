<template>
    <li class="list-group-item d-flex justify-content-between align-items-center" v-if="!isEditing">
        {{ client }}
        <div class="d-flex gap-2">
            <EditButton @click="isEditing = true" />
            <DeleteButton db="clients" :id="id" />
        </div>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center gap-3" v-if="isEditing">
        <input v-model="client" class="form-control">
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
    console.log(db, id, data);
    patchData(db, id, data);
    isEditing.value = false;
}
</script>
<style >
    
</style>