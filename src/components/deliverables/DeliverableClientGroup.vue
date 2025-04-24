<template>
    <div class="accordion p-0 mt-3" :id="`accordionExample-${id}`">
        <div class="accordion-item border-0">
            <h4 class="accordion-header p-3 py-2" :id="`#collapse-${id}`">
                <div class="d-flex align-items-center cursor-pointer" data-bs-toggle="collapse" :data-bs-target="`#collapse-${id}`" aria-expanded="true" :aria-controls="`#collapse-${id}`">
                    <img :src="client.logo" class="logo me-2" > 
                    {{ client.client_name }}

                    <div class="ms-auto">
                        <div class="badge" v-if="client.deliverables.length > 0">{{ client.deliverables.length }}</div>
                        <img src="@/assets/chevron-icon.svg" alt="arrow-down" class="ms-2">
                    </div>
                </div>
            </h4>
            <div :id="`collapse-${id}`" class="accordion-collapse collapse show" :aria-labelledby="`#collapse-${id}`" :data-bs-parent="`#accordionExample-${id}`">
                <div class="accordion-body px-1 pb-1 pt-0 d-flex flex-column gap-1">
                    <DeliverableListItem v-for="deliverable in deliverablesNotDone" :key="deliverable.upcoming_weeks_deliverable_id" :deliverable="deliverable" :display-logo="false"/>
                    <DeliverableListItemDone v-for="deliverable in deliverablesDone" :key="deliverable.upcoming_weeks_deliverable_id" :deliverable="deliverable" :display-logo="false"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

// Components
import DeliverableListItem from "@/components/deliverables/DeliverableListItem.vue";
import DeliverableListItemDone from "@/components/deliverables/DeliverableListItemDone.vue";

const props = defineProps({
    client: Object,
    id: Number
})

const deliverablesDone = computed(() => props.client?.deliverables?.filter(deliverable => deliverable.is_completed_by_user === '1'))
const deliverablesNotDone = computed(() => props.client?.deliverables?.filter(deliverable => deliverable.is_completed_by_user === '0'))
</script>

<style scoped>
.logo {
    height: 28px;
}
h4 {
    font-size: 14px;
    margin: 0;
}
.badge {
    background-color: var(--paars);
    font-size: 12px;
}
.accordion-header {
    background-color: var(--bg);
    border-radius: var(--br) var(--br) 0 0;
}
.accordion-body {
    background-color: var(--bg);
    border-radius: 0 0 var(--br) var(--br);
}
.accordion {
    border-radius: var(--br);
    overflow: hidden;
}
</style>