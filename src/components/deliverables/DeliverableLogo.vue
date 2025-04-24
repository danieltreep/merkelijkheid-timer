<template>
    <img class="logo ms-3" :src="returnClient(deliverable.client_id).logo">
    
</template>

<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";

// Props
const props = defineProps({
    deliverable: Object
})

const { clients } = storeToRefs(useDataStore());

// Methods
function returnClient(id) {
    return clients.value.find(c => c.client_id === id)
}
</script>

<style scoped>
.logo {
    height: 34px;
    width: 34px;
}
</style>