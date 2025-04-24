<template>
    <button @click="toggleDone" class="status d-flex align-items-center justify-content-center" :class="deliverable.is_completed_by_user === '1' ? 'done' : ''">
        <img src="@/assets/check-icon-white.svg" alt="">
    </button>
</template>

<script setup>
import patchData from '@/composables/patchData';
import { makeDateSqlCompatible } from '@/composables/functions';

// Props
const props = defineProps({
    deliverable: Object
})

const emit = defineEmits(['updated'])

// Methods
async function toggleDone() {

    if (props.deliverable.is_completed_by_user === '0') {
        emit('updated')
    }

    setTimeout(async () => {
        await patchData('upcoming_weeks_deliverables', props.deliverable.upcoming_weeks_deliverable_id, { 
            is_completed_by_user: props.deliverable.is_completed_by_user === '1' ? '0' : '1',
            show_notification: props.deliverable.show_notification === '1' ? '0' : '1',
            updated_on: makeDateSqlCompatible(new Date())
        })
    }, props.deliverable.is_completed_by_user === '0' ? 2000 : 0)
}

</script>

<style scoped>
.status {
    height: 24px;
    width: 24px;
    border: 1px solid var(--border-licht);
    background-color: white;
    border-radius: 50%;
}
.status:hover {
    background-color: var(--paars);
    opacity: .5;
    cursor: pointer;
}
.done {
    background-color: var(--paars);
    border: 1px solid var(--paars);
}
.status img {
    scale: 1.3;
}
</style>