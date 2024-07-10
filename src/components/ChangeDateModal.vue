<template >
    <div class="modal fade" id="changeDateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeDateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="changeDateModalLabel">Change date</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <DatePicker @changedate="handleChange"/>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSessionStore } from '@/stores/session'
import patchData from "@/composables/patchData";
import DatePicker from '@/components/DatePicker.vue'
import { makeDateSqlCompatible, parseDateString } from '@/composables/functions'

const { sessionDateChange } = storeToRefs(useSessionStore())

function handleChange(newDate) {
    
    const [day, month, year] = parseDateString(newDate);
 
    const newCreatedAt = new Date(sessionDateChange.value.created_at)
    newCreatedAt.setDate(day)
    newCreatedAt.setMonth(month)
    newCreatedAt.setFullYear(year)
    sessionDateChange.value.created_at = newCreatedAt;

    const newStoppedAt = new Date(sessionDateChange.value.stopped_at)
    newStoppedAt.setDate(day)
    newStoppedAt.setMonth(month)
    newStoppedAt.setFullYear(year)

    sessionDateChange.value.stopped_at = newStoppedAt;
    
}

function handleConfirm() {
    patchData('sessions', sessionDateChange.value.session_id, {created_at: makeDateSqlCompatible(sessionDateChange.value.created_at), stopped_at: makeDateSqlCompatible(sessionDateChange.value.stopped_at)})
}
</script>
<style scoped>
.modal-content {
    border-radius: var(--br);
    border: none;
}
.modal-header, .modal-footer {
    border: none;
}
.modal-footer button {
    background-color: var(--paars);
    padding: .5rem 1.5rem;
    border-radius: var(--br);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: .3rem;
}
</style>