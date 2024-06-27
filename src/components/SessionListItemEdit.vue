<template lang="">
  <li class="list-group-item d-flex justify-content-between align-items-center gap-2 p-3" >

    <div class="d-flex align-items-center gap-2">
      <input type="text" v-model="title" class="form-control">
      <select class="form-select w-50" v-model="project_id">
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.project_name }}
        </option>
      </select>
    </div>

    <div class="d-flex align-items-center gap-2 ">
      <div class="d-flex align-items-center gap-1 form-control">
        <input v-model="startedHours" class="time text-center">:
        <input v-model="startedMinutes" class="time text-center">
      </div>
        -
      <div class="d-flex align-items-center gap-1 form-control">
        <input v-model="stoppedHours" class="time text-center">:
        <input v-model="stoppedMinutes" class="time text-center">
      </div>

      <SaveButton @click="handleSave('sessions', session.id, {title, project_id} )"/>
    </div>
  </li>

</template>
<script setup>
import SaveButton from "@/components/SaveButton.vue";
import patchData from "@/composables/patchData";

import { ref } from "vue";

const props = defineProps({
  session: Object,
  projects: Array
})

const emit = defineEmits(['handleSave']);

const title = ref(props.session.title);
const project_id = ref(props.session.project_id);

let stopped_at = new Date(props.session.stopped_at);
let created_at = new Date(props.session.created_at);

const stoppedHours = ref(prefixZero(new Date(props.session.stopped_at).getHours()));
const stoppedMinutes = ref(prefixZero(new Date(props.session.stopped_at).getMinutes()));
const startedHours = ref(prefixZero(new Date(props.session.created_at).getHours()));
const startedMinutes = ref(prefixZero(new Date(props.session.created_at).getMinutes()));

function handleSave(db, id, data) {
  
  stopped_at.setUTCHours(stoppedHours.value, stoppedMinutes.value);
  created_at.setUTCHours(startedHours.value, startedMinutes.value);
  const time_in_minutes = calculateTimeDifference(created_at, stopped_at);
  const time_elapsed = makeDateSqlCompatible(new Date(stopped_at - created_at));

  stopped_at = makeDateSqlCompatible(stopped_at);
  created_at = makeDateSqlCompatible(created_at);
  
  emit('handleSave');
  patchData(db, id, {...data, stopped_at, created_at, time_elapsed, time_in_minutes});
}

// Voeg een 0 voor enkele getallen
function prefixZero(n) {
if (n < 10) {
  return "0" + n;
}
return n;
}

// Convert Date naar SQL compatible timestamp
function makeDateSqlCompatible(date) {
  const mysqlDatetime = date.toISOString().replace('T', ' ').slice(0, -5);

  return mysqlDatetime;
}

// Bereken tijdverschil in minuten
function calculateTimeDifference(startTime, endTime) {
  const timeDifferenceInMilliseconds = endTime - startTime;
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
  return Math.floor(timeDifferenceInMinutes);
}
</script>

<style scoped>
input.time {
  width: 24px;
  border: 0;
}
</style>