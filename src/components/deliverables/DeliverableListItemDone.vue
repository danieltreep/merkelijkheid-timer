<template>
    <li class="deliverable list-group-item p-3 ps-4 mb-0">
        <div class="d-flex align-items-center">
            <DeliverableDone :deliverable="deliverable" />
            <DeliverableLogo :deliverable="deliverable" v-if="displayLogo !== false" />
        </div>
        <div class="d-flex flex-column justify-content-center align-items-start ms-3">
            <p class="parent_deliverable" v-if="deliverable.parent_deliverable_title">{{ deliverable.parent_deliverable_title }}</p>
            <p class="mb-0">{{ deliverable.deliverable_title }}</p>
        </div>
        <p class="completed"><img src="@/assets/icon-check.svg" v-if="deliverable.updated_on"> {{ dateToDDMMYYYY(deliverable.updated_on) }}</p>
        <DeliverableLink :deliverable="deliverable" />
    </li>
</template>

<script setup>

// Composables
import { dateToDDMMYYYY } from '@/composables/functions';

// Components
import DeliverableLink from "@/components/deliverables/DeliverableLink.vue";
import DeliverableDone from "@/components/deliverables/DeliverableDone.vue";
import DeliverableLogo from "@/components/deliverables/DeliverableLogo.vue";

const props = defineProps({
    deliverable: Object,
    displayLogo: Boolean
})

</script>

<style scoped>
.deliverable {
    display: grid;
    grid-template-columns: minmax(10px, auto) 1fr 110px 140px;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    align-items: center;
    position: relative;
    height: 72px;
    background-color: white;
}
.completed {
    color: var(--groen);
    font-size: 12px;
}
p {
    line-height: 1;
}
.parent_deliverable {
    font-size: 10px;
    color: var(--body);
    line-height: 1;
    font-weight: 500;
    margin-bottom: 2px;
}
</style>
