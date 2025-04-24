<template>
    <div class="block p-4">
        
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="mb-0">Assigned to me</h2>
            <!-- <SortDeliverables @sort="$event => sortBy = $event" /> -->
        </div>
        <!-- <div v-if="sortBy === 'date'">
            <div class="d-flex flex-column gap-2">
                <DeliverableListItem v-for="deliverable in deliverablesNotDoneSorted" :key="deliverable.upcoming_weeks_deliverable_id" :deliverable="deliverable" :display-logo="true"/>
        
                <div class="nothing" v-if="deliverablesNotDone.length === 0">
                    <p>You have completed all of your tasks. Great job! 🎉</p>
                </div>
            </div>
            <div class="mt-4 d-flex flex-column gap-2" v-if="deliverablesDone.length">
                <h2 class="mb-2">Done</h2>
                
                <DeliverableListItemDone v-for="deliverable in deliverablesDoneSorted" :key="deliverable.upcoming_weeks_deliverable_id" :deliverable="deliverable" :display-logo="true"/>
                
            </div>
        </div> -->

        <div v-if="sortBy === 'client'" class="mt-3">
            <DeliverableClientGroup v-for="(clientGroup, id) in deliverablesGroupedSorted" :key="id" :client="clientGroup" :id="id" />
        </div>
    </div>

</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
// import { VueDraggableNext } from 'vue-draggable-next'
// import postData from '@/composables/postData';

// Stores
import { useDataStore } from "@/stores/data";

// Components
import DeliverableListItem from "@/components/deliverables/DeliverableListItem.vue";
import DeliverableListItemDone from "@/components/deliverables/DeliverableListItemDone.vue";
import SortDeliverables from "@/components/deliverables/SortDeliverables.vue";
import DeliverableClientGroup from "@/components/deliverables/DeliverableClientGroup.vue";

const { clients } = storeToRefs(useDataStore());

const props = defineProps({
    deliverables: Array
})

const sortBy = ref('client');

const deliverablesDone = computed(() => props.deliverables?.filter(deliverable => deliverable.is_completed_by_user === '1'))
const deliverablesNotDone = computed(() => props.deliverables?.filter(deliverable => deliverable.is_completed_by_user === '0'))

const deliverablesDoneSorted = computed(() => deliverablesDone.value.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)))
const deliverablesNotDoneSorted = computed(() => deliverablesNotDone.value.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)))

const deliverablesGroupedByClient = computed(() => {
    return props.deliverables?.reduce((acc, deliverable) => {
        const client = clients.value.find(client => client.client_id === deliverable.client_id);
        if (!acc[client.client_id]) {
            acc[client.client_id] = {
                client_id: client.client_id,
                client_name: client.client_name,
                deliverables: [],
                logo: client.logo
            };
        }
        acc[client.client_id].deliverables.push(deliverable);
        return acc;
    }, {});
})

const deliverablesGroupedSorted = computed(() => {
    return Object.values(deliverablesGroupedByClient.value).sort((a, b) => {
        return a.client_name.localeCompare(b.client_name);
    })
})

</script>

<style scoped>
.block {
    background-color: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
    min-height: calc(100svh - 120px);
}
h2 {
    font-size: 18px;
    font-family: 'Red Ring';
}
.list-group {
    box-shadow: none;
}
.nothing {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    font-size: 14px;
}
</style>