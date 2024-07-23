<template>
  <div class="d-flex align-items-center ms-lg-auto">
    <div class="time me-3 d-none d-md-inline">{{ currentSession.time_elapsed }}</div>
    <button v-if="!timerRunning" class="btn start d-flex align-items-center gap-2" @click="startTimerStore">
      <img src="@/assets/play-icon-white.svg" alt="">
      Start
    </button>
    <button
      v-else
      class="btn btn-danger stop d-flex align-items-center gap-2"
      @click="stopTimer"
      :disabled="
        !currentSession.title ||
        !currentSession.project_id
      "
    >
      <span class="d-inline d-md-none">{{ currentSession.time_elapsed }}</span>
      <img src="@/assets/stop-icon-white.svg" alt="">
      <span class="d-none d-md-inline">Stop</span>
    </button>
   
    <ClearButton @click="clearTimer" v-if="timerRunning"/>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { useSessionStore } from "@/stores/session";
import { useTimerStore } from '@/stores/timer'

// Components
import ClearButton from '@/components/timer/ClearButton.vue'

// Props and emits
const emit = defineEmits(['reset', 'initialized']);
const props = defineProps({
  initialized: Boolean
})

// Refs
const { currentSession, runningSession } = storeToRefs(useSessionStore());
const { timerRunning } = storeToRefs(useTimerStore());

// Methods
const { startTimerStore, clearTimerStore, stopTimerStore, continueTimerStore } = useTimerStore();

function stopTimer() {
  stopTimerStore();
  emit('reset');
}

function clearTimer() {
  clearTimerStore()
  emit('reset');
}

// Lifecycle
onMounted(() => {

  // Watch functie werkt alleen als het de eerste render is
  if (!props.initialized) {

    watch(runningSession, (newVal) => {

      // Als runningSession in data store een waarde heeft update de sessie met info van de lopende sessie
      if (newVal.length) {
        continueTimerStore(newVal[0]);
        
      }
    }, { once: true });
    emit('initialized') // Bij de eerste keer zet initialized ref -> true
  }
});

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

@media (max-width: 768px) {
  .btn {
    padding-inline: 1rem;
    border-radius: 8px;
  }
}
</style>