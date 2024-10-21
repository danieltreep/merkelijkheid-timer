<template>
    <div class="block p-4">
        <h2 class="mb-4">Assigned to me</h2>
        
        <DeliverableListItem v-for="deliverable in deliverablesNull" :key="deliverable.deliverable_id" :deliverable="deliverable"/>
    </div>

    <div class="block p-4 mt-4" v-if="deliverablesDone.length">
        <h2 class="mb-4">Done</h2>
        
        <DeliverableListItemDone v-for="deliverable in deliverablesDone" :key="deliverable.deliverable_id" :deliverable="deliverable"/>
        
    </div>
    
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggableNext } from 'vue-draggable-next'
import postData from '@/composables/postData';

// Stores
import { useDeliverablesStore } from "@/stores/deliverables";
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";

// Components
import DeliverableListItem from "@/components/deliverables/DeliverableListItem.vue";
import DeliverableListItemDone from "@/components/deliverables/DeliverableListItemDone.vue";

// Refs
const { deliverablesAssigned } = storeToRefs(useDeliverablesStore());
const { user } = storeToRefs(useUserStore());

const deliverablesDone = computed(() => deliverablesAssigned.value.filter(deliverable => deliverable.status === 'Done'))
const deliverablesNull = computed(() => deliverablesAssigned.value.filter(deliverable => deliverable.status === null))

</script>

<style scoped>
.block {
    background-color: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
}
h2 {
    font-size: 18px;
    font-family: 'Red Ring';
}
.list-group {
    box-shadow: none;
}

</style>