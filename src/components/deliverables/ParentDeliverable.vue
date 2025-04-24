<template>
    <li class="deliverable list-group-item pe-3 ps-4" >
        <div class="d-flex align-items-center">
            <DeliverableDone :deliverable="deliverable" @updated="emit('updated')" />
            <DeliverableLogo :deliverable="deliverable" v-if="displayLogo !== false" />
        </div>
        <div class="d-flex flex-column justify-content-center align-items-start ms-3">
            <p class="mb-0 parent_deliverable" v-if="deliverable.parent_deliverable_title">{{ deliverable.parent_deliverable_title }}</p>
            <p class="mb-0">{{ deliverable.deliverable_title }}</p>
        </div>
        <DeliverableDate :deliverable="deliverable" />
        
        <div>
            <DeliverableNotes :deliverable="deliverable" v-if="deliverable.instructions" />
            <p v-else></p>
        </div>

        <StartTimerButton :deliverable="deliverable" />
    </li>
</template>

<script setup>

// Components
import DeliverableDone from "@/components/deliverables/DeliverableDone.vue";
import DeliverableLogo from "@/components/deliverables/DeliverableLogo.vue";
import DeliverableNotes from "@/components/deliverables/DeliverableNotes.vue";
import DeliverableDate from "@/components/deliverables/DeliverableDate.vue";
import StartTimerButton from "@/components/deliverables/StartTimerButton.vue";

const props = defineProps({
    deliverable: Object,
    displayLogo: Boolean
})

const emit = defineEmits(['updated']);

</script>

<style scoped>
.deliverable {
    display: grid;
    grid-template-columns: minmax(10px, auto) 1fr 130px 60px 40px;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    align-items: center;
    position: relative;
    height: 72px;
    background-color: white;
    line-height: 1;
}
</style>