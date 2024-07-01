<template>
    <div class="delete ms-2 position-relative">
        <img class="delete-icon" src="@/assets/cross-icon.svg" @click="isDeleting = true">

        <div class="delete-tooltip" v-if="isDeleting">
            <p class="mb-2 ms-1">Are you sure?</p>
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
    projectId: String,
})

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
    left: -60px;
    top: calc(100% + 16px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: .7rem;
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
}
</style>