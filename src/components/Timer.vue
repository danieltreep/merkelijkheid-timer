<template>
  <div class="d-flex align-items-center gap-3">
    <div class="time">
      {{ displayHours }}:{{ displayMinutes }}:{{ displaySeconds }}
    </div>
    <button v-if="!timerRunning" class="btn btn-primary" @click="startTimer">
      Start
    </button>
    <button
      v-if="timerRunning"
      class="btn btn-danger"
      @click="stopTimer"
      :disabled="
        !currentSession.title ||
        !currentSession.category_id ||
        !currentSession.project_id
      "
    >
      Stop
    </button>
    <button
      v-if="timerRunning"
      class="btn btn-outline-primary"
      @click="clearTimer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import postData from "@/composables/postData";

defineProps({
  disabled: Boolean,
});

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
  postData("sessions", currentSession.value);

  displaySeconds.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);

  currentSession.value.project_id = null;
  currentSession.value.category_id = null;
  currentSession.value.title = null;
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

function clearTimer() {
  timerRunning.value = false;
  displaySeconds.value = prefixZero(0);
  displayMinutes.value = prefixZero(0);
  displayHours.value = prefixZero(0);
  clearInterval(timerInterval);
  currentSession.value.project_id = null;
  currentSession.value.category_id = null;
  currentSession.value.title = null;
}

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>
