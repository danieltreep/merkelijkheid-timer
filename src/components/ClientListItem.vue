<template>
    <li class="list-group-item d-grid align-items-center py-2" v-if="!isEditing">
        {{ client.client_name }}
        <div class="colors">
            <div class="bolletje" :style="{backgroundColor: client.color}"></div>
        </div>
        <div>

        </div>
        <button class="more-button">
            Add project
          <img class="ms-3" src="@/assets/add-icon.svg" >
        </button>
        <button class="more-button">
          <img src="@/assets/more-icon.svg" >
        </button>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center gap-3" v-if="isEditing">
        <input v-model="client" class="form-control">
        <SaveButton @click="handleEdit('clients', client.client_id, {client_name: client.client_name} )"/>
    </li>
</template>
<script setup>
import { ref } from "vue";
import patchData from "@/composables/patchData";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import SaveButton from "@/components/SaveButton.vue";

const props = defineProps({
    client: Object
})

const client = ref(props.client);
const isEditing = ref(false);

function handleEdit(db, id, data) {
    console.log(db, id, data);
    patchData(db, id, data);
    isEditing.value = false;
}
</script>
<style >
.bolletje {
  height: 15px !important;
  width: 15px !important;
}
.list-group-item {
    grid-template-columns: 20% 20% 1fr 180px 40px;
}
</style>