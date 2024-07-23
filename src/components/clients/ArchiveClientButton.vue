<template>
    <div class="archive ms-2 position-relative">
        <img class="archive-icon" src="@/assets/archive-icon.svg" @click="isArchiving = true">

        <div class="archive-tooltip" v-if="isArchiving">
            <p class="mb-2 ms-1">{{ text }}</p>
            <div class="d-flex">
                <button @click="isArchiving = false">Cancel</button>
                <button @click="handleArchive()" class="archive-button" >{{ button }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

// Composables
import patchData from "@/composables/patchData";

// Props
const props = defineProps({
    clientId: String,
    archived: Boolean
})

// Refs
const isArchiving = ref(false);
const text = props.archived ? 'This will un-archive this client. Are you sure?' : 'This will archive this client. Are you sure?';
const button = props.archived ? 'Un-archive' : 'Archive';

// Methods
async function handleArchive() {
    isArchiving.value = false;

    if (props.archived) {
        await patchData('clients', props.clientId, {is_archived: 0})
    } else {
        await patchData('clients', props.clientId, {is_archived: 1})
    }
}

</script>
<style scoped>
.archive-icon {
    cursor: pointer;
    background-color: transparent;
    padding: .8rem;
    border-radius: var(--br);
    display: flex;
    align-items: center;
    justify-content: center;
    scale: 1.2;
}
.archive-icon:hover {
    background-color: var(--hover);
}
.archive-tooltip {
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
.archive-tooltip::after {
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

.archive-tooltip button {
    border: none;
    background-color: transparent;
    font-weight: 500;
    font-size: 12px;
}
.archive-button {
    color: var(--paars);
}
</style>