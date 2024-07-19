<template >
  <div class="time align-items-center d-none d-md-grid gap-1">
    <img src="@/assets/clock-icon.svg" alt="">
    <input type="text" v-model="started" @blur="handleChange(started, 'created_at')" :class="!isEditable ? 'disabled' : ''" :disabled="!isEditable">
    <div>-</div>
    <input type="text" v-model="ended" @blur="handleChange(ended, 'stopped_at')" :class="!isEditable ? 'disabled' : ''" :disabled="!isEditable">
  </div>
  <input type="text" class="duur elapsed" v-model="time" @blur="handleTimeChange(time)" :class="!isEditable ? 'disabled' : ''" :disabled="!isEditable">
</template>
<script setup>
import { onMounted, ref } from "vue";
import { prefixZero, makeDateSqlCompatible, calculateTimeElapsed } from '@/composables/functions'
import patchData from '@/composables/patchData'

const props = defineProps({
  session: Object,
  isEditable: Boolean
})

const thisSession = ref({...props.session})

const started = ref(prefixZero(new Date(props.session.created_at).getHours()) + ':' + prefixZero(new Date(props.session.created_at).getMinutes()))
const ended = ref(prefixZero(new Date(props.session.stopped_at).getHours()) + ':' + prefixZero(new Date(props.session.stopped_at).getMinutes()))
const initialStarted = ref(new Date(props.session.created_at))
const initialEnded = ref(new Date(props.session.stopped_at))
const time = ref(props.session.time_elapsed.slice(1, -3))
const initialTime = ref(props.session.time_elapsed.slice(1, -3))


async function handleChange(value, key) {
  let hours, minutes;
  let newStarted = new Date(props.session.created_at);;
  let newEnded = new Date(props.session.stopped_at);;

  if (validateInput(value)) {
    [hours, minutes] = validateInput(value)

    if (key === 'created_at') {
      newStarted.setHours(hours)
      newStarted.setMinutes(minutes)
      started.value = `${prefixZero(newStarted.getHours())}:${prefixZero(newStarted.getMinutes())}`
      initialStarted.value = newStarted
    } else {
      newEnded.setHours(hours)
      newEnded.setMinutes(minutes)
      ended.value = `${prefixZero(newEnded.getHours())}:${prefixZero(newEnded.getMinutes())}`
      initialEnded.value = newEnded
    }

  } else {
    // Als waarde niet kloppen reset naar originele waarde
    if (key === 'created_at') {
      started.value = prefixZero(initialStarted.value.getHours()) + ':' + prefixZero(initialStarted.value.getMinutes())
    } else {
      ended.value = prefixZero(initialEnded.value.getHours()) + ':' + prefixZero(initialEnded.value.getMinutes())
    }
    return;
  }

  const timeElapsed = calculateTimeElapsed(newStarted, newEnded)
  time.value = timeElapsed.slice(1, -3);

  await patchData('sessions', props.session.session_id, {
    created_at: makeDateSqlCompatible(newStarted), 
    stopped_at: makeDateSqlCompatible(newEnded),
    time_elapsed: timeElapsed
  })
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
  // console.log(value)
  // Check if the value has 3 or 4 digits and a colon on position 2
  if (value.length !== 3 && value.length !== 4) {
    time.value = initialTime.value
    return;
  }

  if (value.length === 4 && value[1] !== ':') {
    time.value = initialTime.value
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
    time.value = initialTime.value
    return;
  }

  // Create a new date object from currentSession.value
  const date = new Date(thisSession.value.stopped_at);

  // Subtract the hours and minutes from the date object
  date.setHours(date.getHours() - hours);
  if (minutes !== 0) {
    date.setMinutes(date.getMinutes() - minutes);
  }

  started.value = date;
  time.value = `${hours}:${prefixZero(minutes)}`;

  const timeElapsed = calculateTimeElapsed(started.value, new Date(props.session.stopped_at));

  patchData('sessions', props.session.session_id, {time_elapsed: timeElapsed, created_at: makeDateSqlCompatible(started.value)});
  started.value = prefixZero(started.value.getHours()) + ':' + prefixZero(started.value.getMinutes())
}

</script>
<style scoped>
input {
  border: 1px solid transparent;
  padding: .5rem .3rem;
  border-radius: var(--br);
  cursor: text;
  color: black;
}
input:hover:not(.disabled) {
  border: 1px solid #d1d1d1;   
}
.time {
  display: grid;
  /* grid-template-columns: 25px 45px 15px 50px; */
  grid-template-columns: 20px 50px 10px 50px;
}
.elapsed {
  font-size: 20px;
  font-weight: 500;
  width: 55px;
  margin-left: -6px;
  padding: .3rem .3rem;
}

@media (max-width: 768px) {
  .duur {
    order: 0;
    text-align: end;
  }
}
</style>