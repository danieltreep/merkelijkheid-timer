<template>
    <div class="calendar-header px-4 pt-4">
        <div class="d-flex justify-content-between align-items-center pb-1 pt-3">
            <button class="button" @click="decrementMonth"><img src="@/assets/chevron-left.svg"></button>
            <h2>{{ fullMonth }} {{ year }}</h2>
            <button class="button" @click="incrementMonth"><img src="@/assets/chevron-right.svg"></button>
        </div>

          <hr>

          <div class="days d-grid">
            <p class="mb-0">Monday</p>
            <p class="mb-0">Tuesday</p>
            <p class="mb-0">Wednesday</p>
            <p class="mb-0">Thursday</p>
            <p class="mb-0">Friday</p>
          </div>
    </div>
    <div class="calendar p-4">
        <DayBox v-for="(day, index) in workdays" :key="index" :day="day" />
        
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRoute } from 'vue-router'

import DayBox from '@/components/calendar/DayBox.vue'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = ref(new Date().getMonth() + 1);
const year = ref(new Date().getFullYear());
const fullMonth = computed(() => months[month.value - 1]);

const workdays = computed(() => {
  const workdays = [];
  const date = new Date(year.value, month.value - 1, 1); // month is zero-indexed

  while (date.getMonth() === month.value - 1) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
        workdays.push(new Date(date)); // Add a new date object to avoid reference issues
    }
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  const firstWorkday = workdays[0].getDay();
  const prependWorkdays = firstWorkday - 1;

  for (let i = 0; i < prependWorkdays; i++) {
    workdays.unshift(null);
  }

  return workdays;
});

function incrementMonth() {
  if (month.value === 12) {
    month.value = 1;
    year.value++;
  } else {
    month.value++;
  }
}

function decrementMonth() {
  if (month.value === 1) {
    month.value = 12;
    year.value--;
  } else {
    month.value--;
  }
}

</script>

<style scoped>
.calendar {
  background-color: white;
  border-radius: var(--br);
  box-shadow: var(--bs);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.calendar-header {
    background: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
    /* padding: 1rem; */
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.button {
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}
h2 {
    font-size: 18px;
    font-family: 'Red Ring';
    margin: 0;
    width: 200px;
    text-align: center;
}
.days {
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    text-align: center;
    border-top: 1px solid #EDEEF1;
    padding-block: 1rem;
    font-family: 'Helvetica Neue';
    font-size: 16px;
    font-weight: 400;
}
</style>