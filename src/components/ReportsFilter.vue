<template>
    <div class="position-relative d-flex align-items-end">
        <button class="d-flex align-items-center open-options" @click="showOptions = !showOptions">
            {{ startDateString }} - {{ endDateString }} 
            <img class="ms-2" src="@/assets/calendar-icon.svg" alt="">
        </button>

        <div class="filter-tooltip" v-if="showOptions">
            <p class="mb-2"><small>Show reports for</small></p>
            <div class="tabs d-flex justify-content-between">
                <input type="radio" name="daterange" id="7days" value="7" v-model="sessionsOfAmountDays" checked>
                <label for="7days">7 days</label>

                <input type="radio" name="daterange" id="30days" value="30" v-model="sessionsOfAmountDays" >
                <label for="30days">30 days</label>

                <input type="radio" name="daterange" id="90days" value="90" v-model="sessionsOfAmountDays" >
                <label for="90days">90 days</label>

                <!-- <input type="radio" name="daterange" id="customrange" value="Custom" >
                <label for="customrange">Custom</label> -->
            </div>

            <!-- <div class="customrangeoptions mt-4" v-show="dateRangeDays === 'Custom'">
                <p class="mb-2"><small>Select your date range</small></p>

                <div class="d-flex gap-2">
                    <div class="input d-flex align-items-center gap-1">
                        <img src="@/assets/calendar-icon-grijs.svg" alt="">
                        <input type="text" id="start-date" >

                    </div>
                    <div class="input d-flex align-items-center gap-1">
                        <img src="@/assets/calendar-icon-grijs.svg" alt="">
                        <input type="text" id="end-date">

                    </div>
                </div>

                
            </div> -->
            <button class="btn select-button mt-4" @click="handleSubmit">Select</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
// import { Datepicker } from 'vanillajs-datepicker';
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import getSessions from '@/composables/getSessions'

const { sessionsOfAmountDays, sessions } = storeToRefs(useDataStore());

const showOptions = ref(false)

const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - sessionsOfAmountDays.value)

const startDateRef = ref(lastWeek)
const endDateRef = ref(new Date())

const startDateString = computed(() => {
    return formatDate(startDateRef.value)
})
const endDateString = computed(() => {
    return formatDate(endDateRef.value)
})

async function handleSubmit() {
    showOptions.value = false;
    const startDate = new Date(endDateRef.value);
    startDate.setDate(endDateRef.value.getDate() - sessionsOfAmountDays.value)
    startDateRef.value = startDate
    sessions.value = await getSessions(null, sessionsOfAmountDays.value);
}

// onMounted(() => {
//     const startDateInput = document.getElementById('start-date');
//     const endDateInput = document.getElementById('end-date');

//     const startDatePicker = new Datepicker(startDateInput, {
//         autohide: true,
//         format: 'dd-mm-yyyy'
//     });

//     const endDatePicker = new Datepicker(endDateInput, {
//         autohide: true,
//         format: 'dd-mm-yyyy'
//     });

//     startDateInput.addEventListener('changeDate', (e) => {
//         const startDate = startDatePicker.getDate();
//         endDatePicker.setOptions({
//             minDate: startDate
//         });

//         if (endDatePicker.getDate() < startDate) {
//             endDatePicker.setDate(startDate);
//         }
//         startDateRef.value = startDate
//     });

//     endDateInput.addEventListener('changeDate', (e) => {
//         const endDate = endDatePicker.getDate();
//         startDatePicker.setOptions({
//             maxDate: endDate
//         });
//         endDateRef.value = endDate

//     });
// })

function formatDate(date) {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];

    const formattedDate = `${day} ${month}`;

    return formattedDate;
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
</style>