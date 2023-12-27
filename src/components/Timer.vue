<template>
  <div class="d-flex align-items-center gap-3">
    <div class="time">
      {{ displayHours }}:{{ displayMinutes }}:{{ displaySeconds }}
    </div>
    <button v-if="!timerRunning" class="btn btn-primary" @click="startTimer">
      Start
    </button>
    <button v-if="timerRunning" class="btn btn-danger" @click="stopTimer">
      Stop
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const timerRunning = ref(false);

const timeStarted = ref();
const timeStopped = ref();
const timeElapsed = ref();

const displaySeconds = ref(prefixZero(0));
const displayMinutes = ref(prefixZero(0));
const displayHours = ref(prefixZero(0));

let timerInterval = null;

function startTimer() {
  timerRunning.value = true;
  timeStarted.value = new Date();
  timerInterval = setInterval(clockRunning, 1000);
}

function stopTimer() {
  timerRunning.value = false;
  timeStopped.value = new Date();
  clearInterval(timerInterval);
}

function clockRunning() {
  const currentTime = new Date();
  timeElapsed.value = new Date(currentTime - timeStarted.value);
  displaySeconds.value = prefixZero(timeElapsed.value.getUTCSeconds());
  displayHours.value = prefixZero(timeElapsed.value.getUTCHours());
  displayMinutes.value = prefixZero(timeElapsed.value.getUTCMinutes());
}

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>
