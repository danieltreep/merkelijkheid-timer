<template>

    <ParentDeliverable
        v-if="!showSuccessMessage && deliverable.children.length === 0" 
        :deliverable="deliverable" 
        @updated="handleUpdate" 
    />
    
    <ChildDeliverable 
        v-if="!showSuccessMessage && deliverable.children.length > 0" 
        :deliverable="deliverable" 
        @updated="handleUpdate" 
    />
    
    <SuccesMessage v-if="showSuccessMessage" />
</template>

<script setup>
import { ref } from 'vue';

// Components
import SuccesMessage from "@/components/deliverables/SuccesMessage.vue";
import ChildDeliverable from '@/components/deliverables/ChildDeliverable.vue';
import ParentDeliverable from '@/components/deliverables/ParentDeliverable.vue';

// Refs
const showSuccessMessage = ref(false)

const props = defineProps({
    deliverable: Object,
    displayLogo: Boolean
})

function handleUpdate() {
    showSuccessMessage.value = true

    setTimeout(() => {
        showSuccessMessage.value = false
    }, 2000)
}

</script>

<style scoped>

</style>