<template>
    <div class="position-relative d-flex align-items-end">
        <button class="d-flex align-items-center open-options" @click="showOptions = !showOptions">
            {{ startDateString }} - {{ endDateString }} 
            <img class="ms-2" src="@/assets/calendar-icon.svg">
        </button>

        <div class="filter-tooltip" v-if="showOptions">
            <p class="mb-2"><small>Show reports for</small></p>
            <div class="tabs d-grid gap-2 justify-content-between">
                <input type="radio" name="daterange" id="7days" value="7" v-model="sessionsOfAmountDays" checked>
                <label for="7days">7 days</label>

                <input type="radio" name="daterange" id="30days" value="30" v-model="sessionsOfAmountDays" >
                <label for="30days">30 days</label>

                <input type="radio" name="daterange" id="90days" value="90" v-model="sessionsOfAmountDays" >
                <label for="90days">90 days</label>
                
                <input type="radio" name="daterange" id="halfjaar" value="180" v-model="sessionsOfAmountDays" >
                <label for="halfjaar">1/2 year</label>

                <input type="radio" name="daterange" id="jaar" value="365" v-model="sessionsOfAmountDays" >
                <label for="jaar">1 year</label>

                <input type="radio" name="daterange" id="customrange" value="custom" v-model="sessionsOfAmountDays"  >
                <label for="customrange">Custom</label>
            </div>

            <div class="customrangeoptions mt-4" v-show="sessionsOfAmountDays === 'custom'">
                <p class="mb-2"><small>Select your date range</small></p>

                <ReportsFilterDateInput 
                    :startDate="startDateRef"
                    :endDate="endDateRef"
                    @handleStartChange="handleStartChange" 
                    @handleEndChange="handleEndChange"
                />
                
            </div>
            <button class="btn select-button mt-4" @click="handleSubmit">Select</button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";

// Composables
import getSessions from '@/composables/getSessions'
import { makeDateSqlCompatible } from '@/composables/functions'

// Components
import ReportsFilterDateInput from '@/components/reports/ReportsFilterDateInput.vue'

// Refs
const { sessionsOfAmountDays, sessions } = storeToRefs(useDataStore());
const showOptions = ref(false)

const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - sessionsOfAmountDays.value)

const startDateRef = ref(lastWeek)
const endDateRef = ref(new Date())

const startDateString = computed(() => formatDate(startDateRef.value))
const endDateString = computed(() => formatDate(endDateRef.value))

// Methods
async function handleSubmit() {
    showOptions.value = false;
    
    if (sessionsOfAmountDays.value === 'custom') {
        sessions.value = await getSessions(null, null, null, makeDateSqlCompatible(startDateRef.value), makeDateSqlCompatible(endDateRef.value));

    } else {
        endDateRef.value = new Date();

        const startDate = new Date();
        startDate.setDate(endDateRef.value.getDate() - sessionsOfAmountDays.value)
        startDateRef.value = startDate
        sessions.value = await getSessions(null, sessionsOfAmountDays.value);
    }
}

function formatDate(date) {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];

    const formattedDate = `${day} ${month}`;

    return formattedDate;
}

function handleStartChange(date) {
    startDateRef.value = date
}

function handleEndChange(date) {
    endDateRef.value = date
}

</script>
<style scoped>

button.open-options {
    background-color: white;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    padding: .5rem 1rem;
}
button.select-button {
    background-color: #A53EF415;
    color: var(--paars);
    font-weight: 500;
    width: 100%;
}
.filter-tooltip {
    position: absolute;
    right: 0;
    width: 275px;
    font-size: 13px;
    top: calc(100% + 15px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: 1rem;
    border-radius: var(--br);
    border: 1px solid #E8E8E8;
    z-index: 999;
  
}
.filter-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: white;
    top: -7px;
    right: 33px;
    border-left: 1px solid var(--border);
    border-top: 1px solid var(--border);
    transform: rotate(45deg);
    z-index: -1;
    border-radius: 3px 0 0 0;
}
input[type="radio"] {
    display: none;
}
input[type="radio"]:checked + label {
    color: var(--paars);
}
label {
    font-weight: 500;
    cursor: pointer;
    color: #858585;
}

input[type="text"] {
    border: none;
    outline: none;
    width: 100%;
    /* border-radius: 30px; */
    
}
.input {
    border: 1px solid var(--border);
    border-radius: 30px;
    padding: .3rem .5rem;
    width: 50%;
}

.tabs {
    grid-template-columns: repeat(3, 1fr);
}
</style>