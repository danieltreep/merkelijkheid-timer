<template>
    <div class="position-absolute edit-running-timer p-3">
      <div class="d-flex align-items-center">
        <p class="mb-0 text-center me-auto">Start time</p>
        <input type="text" v-model="started">
      </div>
        <button class="btn select-button mt-3" @click="handleSubmit">Confirm</button>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from "@/stores/timer";

// Composables
import patchData from '@/composables/patchData'
import { prefixZero, makeDateSqlCompatible } from '@/composables/functions'

// Emits
const emit = defineEmits(['closeEditor'])

// Refs
const { currentSession } = storeToRefs(useSessionStore());
const { currentSessionId } = storeToRefs(useTimerStore());
const started = ref();

// Methods
function handleSubmit() {
  const [hours, minutes] = validateInput(started.value)

  const newDate = new Date(currentSession.value.created_at)
  newDate.setHours(hours),
  newDate.setMinutes(minutes)

  currentSession.value.created_at = newDate
  patchData('sessions', currentSessionId.value, {created_at: makeDateSqlCompatible(currentSession.value.created_at)})
  emit('closeEditor')
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

onMounted(() => {
  const currentDate = new Date(currentSession.value.created_at);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  started.value = `${prefixZero(hours)}:${prefixZero(minutes)}`;
})
</script>

<style scoped>
.edit-running-timer {
  top: calc(100% + 8px);
  left: -10%;
  background-color: white;
  border-radius: var(--br);
  box-shadow: var(--bs);
  z-index: 10;
  width: 180px;
}

input {
  border: 1px solid transparent;
  padding: .5rem;
  border-radius: var(--br);
  cursor: text;
  color: black;
  border: 1px solid #d1d1d1;   
  width: 40%;
  text-align: center;
}
button.select-button {
  background-color: #A53EF415;
  color: var(--paars);
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  /* width: 80px; */
}
</style>