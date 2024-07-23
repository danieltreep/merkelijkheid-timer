<template>
    <div class="delete ms-2 position-relative">
        <button class="btn btn-clear delete-button" @click="isDeleting = true">
            <img class="delete-icon" src="@/assets/delete-icon.svg" >
            Delete project
        </button>

        <div class="delete-tooltip" v-if="isDeleting">
            <p class="mb-2 ms-1">Are you sure?</p>
            <div class="d-flex">
                <button @click="isDeleting = false" class="hover">Cancel</button>
                <button @click="handleDelete()" class="delete-option" data-bs-dismiss="modal" >Delete</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

// Composables
import deleteData from "@/composables/deleteData";

// Refs
const isDeleting = ref(false);

// Props
const props = defineProps({
    projectId: String,
})

// Methods
function handleDelete() {
    isDeleting.value = false;
    deleteData('projects', props.projectId)
}

</script>
<style scoped>
.delete-icon {
    cursor: pointer;
}
.delete-tooltip {
    position: absolute;
    left: 0px;
    top: calc(100% + 16px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: .7rem;
    font-size: 13px;
    /* text-align: center; */
    border-radius: var(--br);
    border: 1px solid var(--border);
}
.delete-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: white;
    top: -7px;
    left: 50%;
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
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: .3rem;
    height: 100%;
    padding: .5rem 1rem;
}
.delete-option {
    color: #EE7170;
}
.delete-button:hover, .hover:hover {
    background-color: var(--hover);
    border-radius: var(--br);
}
</style>