<template>
    <div class="d-flex gap-2">
        <div class="input d-flex align-items-center gap-1">
            <img src="@/assets/calendar-icon-grijs.svg">
            <input type="text" id="start-date" >

        </div>
        <div class="input d-flex align-items-center gap-1">
            <img src="@/assets/calendar-icon-grijs.svg">
            <input type="text" id="end-date">
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { Datepicker } from 'vanillajs-datepicker';

const props = defineProps({
    startDate: Date,
    endDate: Date
})

const emit = defineEmits(['handleStartChange', 'handleEndChange'])

onMounted(() => {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');

    const startDatePicker = new Datepicker(startDateInput, {
        autohide: true,
        format: 'dd-mm-yyyy'
    });

    const endDatePicker = new Datepicker(endDateInput, {
        autohide: true,
        format: 'dd-mm-yyyy'
    });

    endDatePicker.setDate(props.endDate);
    startDatePicker.setDate(props.startDate);

    startDateInput.addEventListener('changeDate', (e) => {
        const startDate = startDatePicker.getDate();
        endDatePicker.setOptions({
            minDate: startDate
        });

        if (endDatePicker.getDate() < startDate) {
            endDatePicker.setDate(startDate);
        }
        
        emit('handleStartChange', startDate)
    });

    endDateInput.addEventListener('changeDate', (e) => {
        const endDate = endDatePicker.getDate();
        startDatePicker.setOptions({
            maxDate: endDate
        });
        
        emit('handleEndChange', endDate)

    });
})
</script>
<style scoped>
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