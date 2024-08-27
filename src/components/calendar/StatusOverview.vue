<template>
    <div class="d-flex gap-2 mt-4">
        <div class="status ms-auto">🐧 {{ daysInOffice }}</div>
        <div class="status">🏡 {{ daysAtHome }}</div>
        <div class="status">☕ {{ daysInOfficeNoLunch }}</div>
        <div class="status">⛔️ {{ daysFixedDayOff }}</div>
        <div class="status">🤮 {{ daysSick }}</div>
        <div class="status">🏖️ {{ daysVacation }}</div>
        <div class="status">🎄 {{ daysHoliday }}</div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { computed } from 'vue';

const { statuses } = storeToRefs(useDataStore())

const statusesInThisYear = computed(() => {
    return statuses.value.filter(status => new Date(status.date).getFullYear() === new Date().getFullYear())
})

const daysInOffice = computed(() => {
    return statusesInThisYear.value.filter(status => status.location === '🐧 Office').length
})
const daysAtHome = computed(() => {
    return statusesInThisYear.value.filter(status => status.location === '🏡 Home').length
})
const daysInOfficeNoLunch = computed(() => {
    return statusesInThisYear.value.filter(status => status.location === '☕ Half day').length
})
const daysFixedDayOff = computed(() => {
    return statusesInThisYear.value.filter(status => status.status === '⛔️ Fixed day off').length
})
const daysSick = computed(() => {
    return statusesInThisYear.value.filter(status => status.status === '🤮 Sick').length
})
const daysVacation = computed(() => {
    return statusesInThisYear.value.filter(status => status.status === '🏖️ Vacation day').length
})
const daysHoliday = computed(() => {
    return statusesInThisYear.value.filter(status => status.status === '🎄 Holiday').length
})
</script>

<style scoped>
.status {
    border: 1px solid var(--border);
    border-radius: 30px;
    padding: .3rem 1rem;
    word-spacing: .4rem;
    font-size: 14px;
}
</style>