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
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

defineProps({
  disabled: Boolean,
});

const emit = defineEmits(["onStopTimer"]);

const { session } = storeToRefs(useDataStore());

const timerRunning = ref(false);

const displaySeconds = ref(prefixZero(0));
const displayMinutes = ref(prefixZero(0));
const displayHours = ref(prefixZero(0));

let timerInterval = null;

function startTimer() {
  timerRunning.value = true;
  session.value.created_at = new Date();
  timerInterval = setInterval(clockRunning, 1000);
}

function stopTimer() {
  timerRunning.value = false;
  session.value.stopped_at = new Date();
  clearInterval(timerInterval);
  displaySeconds.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);

  emit("onStopTimer");
}

function clockRunning() {
  const currentTime = new Date();
  session.value.time_elapsed = new Date(currentTime - session.value.created_at);
  displaySeconds.value = prefixZero(session.value.time_elapsed.getUTCSeconds());
  displayHours.value = prefixZero(session.value.time_elapsed.getUTCHours());
  displayMinutes.value = prefixZero(session.value.time_elapsed.getUTCMinutes());
}

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>