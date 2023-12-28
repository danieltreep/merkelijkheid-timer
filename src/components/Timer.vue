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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

defineProps({
  disabled: Boolean,
});

const emit = defineEmits(["onStopTimer"]);

const { currentSession } = storeToRefs(useDataStore());

const timerRunning = ref(false);

const displaySeconds = ref(prefixZero(0));
const displayMinutes = ref(prefixZero(0));
const displayHours = ref(prefixZero(0));

let timerInterval = null;

function startTimer() {
  timerRunning.value = true;
  currentSession.value.created_at = new Date();
  timerInterval = setInterval(clockRunning, 1000);
}

function stopTimer() {
  timerRunning.value = false;
  currentSession.value.stopped_at = new Date();
  clearInterval(timerInterval);
  displaySeconds.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);

  emit("onStopTimer");
}

function clockRunning() {
  const currentTime = new Date();
  currentSession.value.time_elapsed = new Date(
    currentTime - currentSession.value.created_at
  );
  displaySeconds.value = prefixZero(
    currentSession.value.time_elapsed.getUTCSeconds()
  );
  displayHours.value = prefixZero(
    currentSession.value.time_elapsed.getUTCHours()
  );
  displayMinutes.value = prefixZero(
    currentSession.value.time_elapsed.getUTCMinutes()
  );
}

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>
