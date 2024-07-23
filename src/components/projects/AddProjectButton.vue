<template>
    <button class="more-button add-project-button" data-bs-toggle="modal" data-bs-target="#addProjectModal" @click="currentClientId = clientId">
        Add project
        <img class="ms-3" src="@/assets/add-icon.svg" >
    </button>

</template>
<script setup>
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';

defineProps({
    clientId: String
})

const { currentClientId } = storeToRefs(useDataStore())
</script>
