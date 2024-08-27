<template>
    <div class="day-box day position-relative" v-if="day" :class="{ today, filledIn, hasDayPassed }">
        <div class="d-flex align-items-center justify-content-between position-relative">
            <p class="day-number mb-0">{{ day.getDate() }}</p>
            <button class="d-flex align-items-center gap-2 location-button" @click="showTooltip = !showTooltip" v-if="!statusFilledIn">
                <img src="@/assets/icon-plus-grey.svg" v-if="!statusOfToday?.location">
                {{ statusOfToday?.location ? statusOfToday.location : 'Location' }}
            </button>
            <div class="location-tooltip position-absolute d-flex flex-column justify-content-start" v-if="showTooltip">
                <button @click="changeWorkLocation('🐧 Office')">🐧 Office</button>
                <button @click="changeWorkLocation('🏡 Home')">🏡 Home</button>
                <button @click="changeWorkLocation('☕ Half day')">☕ Half day</button>
            </div>
        </div>
        <div class="position-relative">

            <button class="status mt-4 d-flex align-items-center gap-2" v-if="!filledIn" @click="showStatusTooltip = !showStatusTooltip">
                <img src="@/assets/icon-error.svg" alt="error" v-if="!statusFilledIn && hasDayPassed">
                {{ statusOfToday?.status ? statusOfToday.status : 'Fill in absence' }}
                <img src="@/assets/chevron-icon.svg" alt="chevron" v-if="!statusFilledIn">
            </button>
            <div class="status-tooltip position-absolute d-flex flex-column justify-content-start" v-if="showStatusTooltip">
                <button @click="changeWorkStatus('⛔️ Fixed day off')">⛔️ Fixed day off</button>
                <button @click="changeWorkStatus('🤮 Sick')">🤮 Sick</button>
                <button @click="changeWorkStatus('🏖️ Vacation day')">🏖️ Vacation day</button>
                <button @click="changeWorkStatus('🎄 Holiday')">🎄 Holiday</button>
            </div>
        </div>
        <button class="position-absolute reset-button" @click="resetDay" v-if="filledIn || statusFilledIn">
            <img src="@/assets/icon-reset.svg" alt="reset">
        </button>
    </div>
    <div class="day-invalid day" v-if="!day"></div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia';

// Stores
import { useUserStore } from '@/stores/user';
import { useDataStore } from '@/stores/data';

// Composables
import postData from '@/composables/postData';
import deleteData from '@/composables/deleteData';
import patchData from '@/composables/patchData';
import { dateToYYYYMMDD } from '@/composables/functions'

const props = defineProps({
    day: {
        type: [Date, null],
        required: true
    }
})

// Refs
const { user } = storeToRefs(useUserStore())
const { statuses } = storeToRefs(useDataStore())

const showTooltip = ref(false)
const showStatusTooltip = ref(false)
const statusId = ref(null)

const today = computed(() => {
    const today = new Date();
    return today.toDateString() === props.day.toDateString();
})

const hasDayPassed = computed(() => {
    if (!props.day) return false;
    const today = new Date();
    return props.day < today.setHours(0, 0, 0, 0);
});

const statusOfToday = computed(() => {
    
    return statuses.value.find(status => {
        return status.date === dateToYYYYMMDD(props.day)
    })
})

const filledIn = computed(() => {
    return statusOfToday.value?.location ? true : false
})

const statusFilledIn = computed(() => {
    return statusOfToday.value?.status ? true : false
})


watch([statusOfToday], () => {

    showTooltip.value = false
    showStatusTooltip.value = false
    statusId.value = null

    if (statusOfToday.value) {
        statusId.value = statusOfToday.value?.status_id
    } 
})

// Methods
async function changeWorkLocation(location) {
    showTooltip.value = false

    if (statusId.value) {
        await patchData('statuses', statusId.value, {location})
    } else {
        statusId.value = await postData('statuses', {date: dateToYYYYMMDD(props.day), user_id: user.value.user_id, location})
    }
}

async function changeWorkStatus(status) {
    showStatusTooltip.value = false
  
    if (statusId.value) {
        await patchData('statuses', statusId.value, {status})
    } else {
        statusId.value = await postData('statuses', {date: dateToYYYYMMDD(props.day), user_id: user.value.user_id, status})
    }

}


async function resetDay() {
    await deleteData('statuses', statusId.value)
    statusId.value = null
}

</script>

<style scoped>
.day {
    border: 1px solid var(--border);
    border-radius: var(--br);
    color: #A1A1A1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130px;
}

.day-number {
    font-size: 30px;
    font-weight: 700;
    font-family: 'Red Ring';
}
.day-invalid {
    background-color: var(--bg);
    border: none;
}
.location-button {
    font-size: 13px;
    color: #3A3A3A;
    font-weight: 500;
    border-radius: 30px;
    border: none;
    background-color: var(--tag);
    padding: .5rem 1rem;
}
.hasDayPassed {
    color: black;
}
.today {
    border: 1px solid var(--paars);
    color: black;
}
.filledIn {
    background-color: var(--lichtpaars);
}
.filledIn .location-button {
    border: 1px solid var(--paars);
    background-color: #A53EF415;
}
.status {
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 500;
}
.location-tooltip,
.status-tooltip {
    right: 0;
    width: 175px;
    font-size: 14px;
    top: calc(100% + 15px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: .5rem;
    border-radius: var(--br);
    border: 1px solid #E8E8E8;
    z-index: 999;
}
.location-tooltip button,
.status-tooltip button {
    border: none;
    background-color: transparent;
    width: 100%;
    text-align: left;
    padding: .3rem .5rem;
}
.location-tooltip button:hover,
.status-tooltip button:hover {
    background-color: var(--tag);
    border-radius: 8px;
}
.location-tooltip::after,
.status-tooltip::after {
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
.status-tooltip {
    left: -4rem;
}
.reset-button {
    right: .8rem;
    bottom: .9rem;
    background-color: transparent;
    border: none;
    display: none;
}
.day:hover .reset-button {
    display: inline;
}
</style>