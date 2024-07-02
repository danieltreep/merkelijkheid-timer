<template>
  <div class="d-flex align-items-center ms-auto">
    <div class="time me-3">
      {{ displayHours }}:{{ displayMinutes }}:{{ displaySeconds }}
    </div>
    <button v-if="!timerRunning" class="btn start d-flex align-items-center gap-2" @click="startTimer">
      <img src="@/assets/play-icon-white.svg" alt="">
      Start
    </button>
    <button
      v-if="timerRunning"
      class="btn btn-danger stop d-flex align-items-center gap-2"
      @click="stopTimer"
      :disabled="
        !currentSession.title ||
        !currentSession.project_id
      "
    >
    <img src="@/assets/stop-icon-white.svg" alt="">
      Stop
    </button>
   
    <ClearButton @click="clearTimer" v-if="timerRunning"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { useUserStore } from '@/stores/user'

import postData from "@/composables/postData";
import ClearButton from '@/components/ClearButton.vue'
import patchData from "@/composables/patchData";

defineProps({
  disabled: Boolean,
});

const emit = defineEmits(['reset']);

const { user } = storeToRefs(useUserStore());
const { currentSession } = storeToRefs(useDataStore());
const { resetCurrentSession } = useDataStore();
const currentSessionId = ref(null)

const timerRunning = ref(false);

const displaySeconds = ref(prefixZero(0));
const displayMinutes = ref(prefixZero(0));
const displayHours = ref(prefixZero(0));

let timerInterval = null;

async function startTimer() {
  timerRunning.value = true;
  currentSession.value.created_at = new Date();
  currentSessionId.value = await postData('sessions', {created_at: makeDateSqlCompatible(new Date()), user_id: user.value.user_id})
  timerInterval = setInterval(clockRunning, 1000);
}

function stopTimer() {
  timerRunning.value = false;
  
  currentSession.value.stopped_at = new Date();
  currentSession.value.time_in_minutes =  calculateTimeDifference(currentSession.value.created_at, currentSession.value.stopped_at);

  // Zet Date waarden om zodat ze in de database kunnen
  currentSession.value.created_at = makeDateSqlCompatible(currentSession.value.created_at);
  currentSession.value.time_elapsed = makeDateSqlCompatible(currentSession.value.time_elapsed);
  currentSession.value.stopped_at = makeDateSqlCompatible(currentSession.value.stopped_at);
  
  // console.log(currentSession.value.time_in_minutes)
  // Stop interval en POST de data
  clearInterval(timerInterval);
  patchData("sessions", currentSessionId.value, {...currentSession.value}); // Voeg user id toe aan sessie

  // Reset display timer
  displaySeconds.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);

  // Reset de waarden van de huidige sessie
  resetCurrentSession();
  emit('reset');
}

function clockRunning() {
  const currentTime = new Date();
  
  currentSession.value.time_elapsed = new Date(
    currentTime - currentSession.value.created_at
  );

  displaySeconds.value = prefixZero(currentSession.value.time_elapsed.getSeconds());
  displayHours.value = prefixZero(currentSession.value.time_elapsed.getUTCHours());
  displayMinutes.value = prefixZero(currentSession.value.time_elapsed.getMinutes());
}

function clearTimer() {
  timerRunning.value = false;
  displaySeconds.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  clearInterval(timerInterval);
  resetCurrentSession();
  emit('reset');
}

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}

function makeDateSqlCompatible(date) {
  // Get the timezone offset in minutes and convert to milliseconds
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  
  // Create a new Date object adjusted to the local time
  const localTime = new Date(date.getTime() - timezoneOffset);
  
  // Format the adjusted date to MySQL-compatible format
  const mysqlDatetime = localTime.toISOString().replace('T', ' ').slice(0, -5);

  return mysqlDatetime;
}

function calculateTimeDifference(startTime, endTime) {
  console.log(startTime, endTime)
  const timeDifferenceInMilliseconds = endTime - startTime;
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
  return Math.floor(timeDifferenceInMinutes);
}


</script>

<style scoped>
.btn {
  border-radius: var(--br);
  padding-inline: 1.5rem;
  height: 38px;
  font-size: 14px;
  }
.start {
  border: none;
  background-color: var(--groen);
  color: white
}
.stop {
  background-color: var(--rood);
  border: none;
}
.time {
  font-size: 20px;
  font-weight: 500;
}
</style>