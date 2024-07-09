<template>
  
  <ul class="list-group mb-5">
    <li class="list-group-item list-header list-group-item-secondary d-flex justify-content-between align-items-center">
      <span v-if="isToday">Today,&nbsp;</span> 
      <span v-if="isYesterday">Yesterday,&nbsp;</span>
      {{dateString}} 
      <span class="d-flex align-items-center ms-auto">Total: <span class="time ms-1"> {{reduceTimeElapsed(sessions)}} </span></span>
    </li>
    <SessionListItem :session="session" v-for="session in sessions" :key="session.session_id"/>
  </ul>
  
</template>

<script setup>
import SessionListItem from "@/components/SessionListItem.vue";

const props = defineProps({
  sessions: Array,
  date: String
})



const date = new Date(props.date);

const day = date.getDate().toString().padStart(2, '0');
const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const month = monthNames[date.getMonth()];
const year = date.getFullYear();

const dateString = ` ${day} ${month} ${year}`;

const today = new Date();
const isToday = date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const isYesterday = date.getDate() === yesterday.getDate() &&
                    date.getMonth() === yesterday.getMonth() &&
                    date.getFullYear() === yesterday.getFullYear();

function reduceTimeElapsed(sessions) {
  let totalSeconds = 0;

  sessions.forEach(session => {
    const [hours, minutes, seconds] = session.time_elapsed.split(':').map(Number);
    totalSeconds += (hours * 3600) + (minutes * 60);
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const totalMinutes = Math.floor(totalSeconds / 60);

  const formattedTime = `${String(totalHours)}:${String(totalMinutes).padStart(2, '0')}`;
  return formattedTime;
}


</script>

<style scoped>
.time {
  font-size: 16px;
  color: #3A3A3A;
}
.list-header {
  font-size: 12px;
  padding-block: .3rem;
}
</style>
