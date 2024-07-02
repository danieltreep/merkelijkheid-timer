<template>
    <div class="delete ms-2 position-relative">
        <img class="delete-icon" src="@/assets/delete-icon.svg" @click="isDeleting = true">

        <div class="delete-tooltip" v-if="isDeleting">
            <p class="mb-2 ms-1">This will delete <b>ALL</b> sessions and projects from this client. <br>Are you sure?</p>
            <div class="d-flex">
                <button @click="isDeleting = false">Cancel</button>
                <button @click="handleDelete()" class="delete-button" >Delete</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import deleteData from "@/composables/deleteData";

const isDeleting = ref(false);

const props = defineProps({
    clientId: String,
})

function handleDelete() {
    isDeleting.value = false;
    deleteData('clients', props.clientId)
}

</script>
<style scoped>
.delete-icon {
    cursor: pointer;
    background-color: transparent;
    padding: .8rem 1rem;
    border-radius: var(--br);
    display: flex;
    align-items: center;
    justify-content: center;
}
.delete-icon:hover {
    background-color: var(--hover);
}
.delete-tooltip {
    position: absolute;
    left: -115px;
    width: 175px;
    font-size: 13px;
    top: calc(100% + 8px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: .7rem;
    border-radius: var(--br);
    border: 1px solid var(--border);
    /* border: none; */
  
}
.delete-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: white;
    top: -7px;
    right: 33px;
    border-left: 1px solid var(--border);
    border-top: 1px solid var(--border);
    transform: rotate(45deg);
    z-index: -1;
    border-radius: 3px 0 0 0;
}

.delete-tooltip button {
    border: none;
    background-color: transparent;
    font-weight: 500;
    font-size: 12px;
}
.delete-button {
    color: #EE7170;
}
</style>