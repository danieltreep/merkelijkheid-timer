<template>
  <div class="d-flex align-items-center ms-auto">
    <DatePicker @changedate="(newDate) => changeDate(newDate)" :today="true"/>
    <div class="times align-items-center gap-1 me-4 ms-5">
      <img src="@/assets/clock-icon.svg">
      <input type="text" v-model="started" @blur="handleChange(started, 'created_at')">
      <div>-</div>
      <input type="text" v-model="ended" @blur="handleChange(ended, 'stopped_at')">
    </div>
    <input type="text" class="time" v-model="time" @blur="handleTimeChange(time)">
    <button 
      class="btn add d-flex align-items-center gap-2" 
      @click="handleSubmit"
      :disabled="!started || !ended || !time || !currentSession.project_id || !currentSession.title"
      >Add</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSessionStore } from "@/stores/session";
import { useUserStore } from '@/stores/user';
import { prefixZero, makeDateSqlCompatible, calculateTimeElapsed, parseDateString } from '@/composables/functions'

import postData from "@/composables/postData";

import DatePicker from '@/components/DatePicker.vue';

const { user } = storeToRefs(useUserStore());
const { currentSession } = storeToRefs(useSessionStore());
const { resetCurrentSession } = useSessionStore();

const emit = defineEmits(['reset']);

const started = ref()
const ended = ref()
const time = ref('0:00')

function handleChange(value, key) {
  
  let hours, minutes;

  if (validateInput(value)) {
    [hours, minutes] = validateInput(value)
  } else {

    if (key === 'created_at') {
      started.value = prefixZero(currentSession.value[key].getHours()) + ':' + prefixZero(currentSession.value[key].getMinutes())
    } else {
      ended.value = prefixZero(currentSession.value[key].getHours()) + ':' + prefixZero(currentSession.value[key].getMinutes())
    }
    return;
  }

  // If all values are correct set currentSession.value Date hours to specified hours
  const currentDate = new Date(currentSession.value[key]);
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  currentSession.value[key] = currentDate;

  if (key === 'created_at') {
    started.value = prefixZero(currentSession.value[key].getHours()) + ':' + prefixZero(currentSession.value[key].getMinutes())
  } else {
    ended.value = prefixZero(currentSession.value[key].getHours()) + ':' + prefixZero(currentSession.value[key].getMinutes())
  }
  currentSession.value.time_elapsed = calculateTimeElapsed(currentSession.value.created_at, currentSession.value.stopped_at);
  time.value = currentSession.value.time_elapsed.slice(1, -3);
}

function validateInput(value) {
  if (value.length !== 4 && value.length !== 5) {
    return false;
  }

  // If the length is 5, ensure it includes a colon at the correct position
  if (value.length === 5 && value[2] !== ':') {
    return false;
  }

  let hours, minutes;

  if (value.length === 5) {
    [hours, minutes] = value.split(':').map(Number);
  } else {
    hours = parseInt(value.slice(0, 2), 10);
    minutes = parseInt(value.slice(2, 4), 10);
  }

  if (hours > 23 || minutes > 59) {
    return false;
  }

  return [hours, minutes]
}

function handleTimeChange(value) {
  console.log(value)
  // Check if the value has 3 or 4 digits and a colon on position 2
  if (value.length !== 3 && value.length !== 4) {
    time.value = currentSession.value.time_elapsed.slice(1, -3)
    return;
  }

  if (value.length === 4 && value[1] !== ':') {
    time.value = currentSession.value.time_elapsed.slice(1, -3)
    return;
  }

  let hours, minutes;

  if (value.length === 4) {
    [hours, minutes] = value.split(':').map(Number);
  } else {
    hours = parseInt(value.slice(0, 1), 10);
    minutes = parseInt(value.slice(1, 3), 10);
  }

  // Check if hours are not more than 23 and minutes are not higher than 59
  if (hours > 9 || minutes > 59) {
    time.value = currentSession.value.time_elapsed.slice(1, -3)
    return;
  }

  // Create a new date object from currentSession.value
  const date = new Date(currentSession.value.stopped_at);

  // Subtract the hours and minutes from the date object
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);

  // Update currentSession.value with the new date object
  currentSession.value.created_at = date;
  time.value = `${hours}:${minutes}`;
  currentSession.value.time_elapsed = `${prefixZero(hours)}:${prefixZero(minutes)}:00`
  started.value = prefixZero(currentSession.value.created_at.getHours()) + ':' + prefixZero(currentSession.value.created_at.getMinutes())
}

function handleSubmit() {
  currentSession.value.created_at = makeDateSqlCompatible(currentSession.value.created_at);
  currentSession.value.stopped_at = makeDateSqlCompatible(currentSession.value.stopped_at);
  
  postData("sessions", {...currentSession.value, user_id: user.value.user_id, is_running: 0});

  // Reset de waarden van de huidige sessie
  resetCurrentSession();
  currentSession.value.created_at = new Date() // zet created_at en stopped_at weer op een datum zodat er daarna weer mee gerekend kan worden
  currentSession.value.stopped_at = new Date()
  emit('reset');
  time.value = currentSession.value.time_elapsed.slice(1, -3);
  started.value = prefixZero(new Date().getHours()) + ':' + prefixZero(new Date().getMinutes())
  ended.value = prefixZero(new Date().getHours()) + ':' + prefixZero(new Date().getMinutes())
}

function changeDate(newDate) {
  const [day, month, year] = parseDateString(newDate);
 
  const newCreatedAt = new Date(currentSession.value.created_at)
  newCreatedAt.setDate(day)
  newCreatedAt.setMonth(month)
  newCreatedAt.setFullYear(year)
  currentSession.value.created_at = newCreatedAt;

  const newStoppedAt = new Date(currentSession.value.stopped_at)
  newStoppedAt.setDate(day)
  newStoppedAt.setMonth(month)
  newStoppedAt.setFullYear(year)

  currentSession.value.stopped_at = newStoppedAt;
 
}

onMounted(() => {
  currentSession.value.created_at = new Date();
  currentSession.value.stopped_at = new Date();
  
  started.value = prefixZero(currentSession.value.created_at.getHours()) + ':' + prefixZero(currentSession.value.created_at.getMinutes())
  ended.value = prefixZero(currentSession.value.stopped_at.getHours()) + ':' + prefixZero(currentSession.value.stopped_at.getMinutes())

})
</script>

<style scoped>
.btn {
  border-radius: var(--br);
  padding-inline: 1.5rem;
  height: 38px;
  font-size: 14px;
  }
.add {
  border: none;
  background-color: var(--paars);
  color: white
}
.time {
  font-size: 20px;
  font-weight: 500;
  padding: .2rem .5rem;
  width: 74px;
  margin-right: 1rem;
}
.times {
  display: grid;
  grid-template-columns: 16px 50px 10px 50px;
  margin-right: 1rem;
}
input {
  border: 1px solid transparent;
  padding: .5rem .3rem;
  border-radius: var(--br);
}
input:hover {
  border: 1px solid var(--hover);
}
.dateinput {
  max-width: 125px;
}
</style>