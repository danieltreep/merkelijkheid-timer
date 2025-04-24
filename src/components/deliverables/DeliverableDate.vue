<template>
    <p :class="{hasPassed: isDatePassed(deliverable.due_date)}" class="due-date">{{ dateToDDMMYYYY(deliverable.due_date) }}</p>
</template>

<script setup>
import { dateToDDMMYYYY, isDatePassed } from '@/composables/functions';

const props = defineProps({
    deliverable: Object
})
</script>

<style scoped>
.hasPassed {
    color: #EE7170;
}
.due-date {
    font-size: 12px;
}
</style>