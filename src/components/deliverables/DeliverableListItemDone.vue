<template>
    <li class="deliverable list-group-item p-3 mb-2">
        <div class="status d-flex align-items-center justify-content-center" :class="deliverable.status">
            <img src="@/assets/check-icon-white.svg" alt="">
        </div>
        <img class="logo" :src="returnClient(deliverable.client_id).logo">
        <p>{{ deliverable.deliverable_title }}</p>
        <p :class="{hasPassed: isDatePassed(deliverable.due_date)}">{{ dateToDDMMYYYY(deliverable.due_date) }}</p>
        <DeliverableLink :deliverable="deliverable" />
    </li>
</template>

<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";
import { useTimerStore } from "@/stores/timer";
import { useUserStore } from "@/stores/user";

// Composables
import { dateToDDMMYYYY } from '@/composables/functions';
import DeliverableLink from "@/components/deliverables/DeliverableLink.vue";

// Refs
const { clients } = storeToRefs(useDataStore());

const props = defineProps({
    deliverable: Object
})

// Methods
function returnClient(id) {
    return clients.value.find(c => c.client_id === id)
}

function isDatePassed(dueDate) {
    const currentDate = new Date();
    const date = new Date(dueDate);
    return date < currentDate;
}

</script>

<style scoped>
.deliverable {
    display: grid;
    grid-template-columns: 45px 50px 1fr 100px 120px;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    align-items: center;
    position: relative;
}
.status {
    height: 28px;
    width: 28px;
    border: 1px solid var(--border-licht);
    border-radius: 50%;
}
.logo {
    height: 34px;
    width: 34px;
}
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: .7rem .5rem;
    border-radius: 8px;
}
button:hover {
    background-color: var(--hover);
}
.hasPassed {
    color: #EE7170;
}
.Done {
    background-color: var(--paars);
}
.status img {
    scale: 1.3;
}
.add-todo img {
    scale: 1.2;
}
</style>