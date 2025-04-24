<template>
    <button @click="selectedDeliverable = deliverable" class="border-0 add-todo" data-bs-toggle="modal" data-bs-target="#deliverableInstructionsModal">
        <img src="@/assets/icon-notes.svg" alt="">
    </button>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDeliverablesStore } from "@/stores/deliverables";

const { selectedDeliverable } = storeToRefs(useDeliverablesStore())

const props = defineProps({
    deliverable: Object
})
</script>

<style scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: .7rem .5rem;
    border-radius: 8px;
    width: 40px;
}
button:hover {
    background-color: var(--hover);
    /* height: ; */
}
</style>