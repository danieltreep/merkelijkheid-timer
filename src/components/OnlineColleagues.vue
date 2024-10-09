<template >
  <!-- <h3 class="mt-4">Today {{ today.getDate() }}-{{ String(today.getMonth() + 1).padStart(2, '0') }}</h3> -->
  <OnlineColleagueAccordion id="1" title="🐧 Office" :statuses="statusesOfToday" :open="true" />
  <OnlineColleagueAccordion id="2" title="🏡 Home" :statuses="statusesOfToday" :open="true"/>
  <OnlineColleagueAccordion id="3" title="☕ Half day" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="4" title="🚗 On the road" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="5" title="⛔️ Fixed day off" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="6" title="🏖️ Vacation day" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="7" title="🤮 Sick" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="8" title="🎄 Holiday" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="9" title="🦙 Leave" :statuses="statusesOfToday" />
  <OnlineColleagueAccordion id="10" title="👻 Unknown" :statuses="statusesOfToday" />

</template>
<script setup>
import { onMounted} from 'vue'
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from '@/stores/data'
import { useSessionStore } from '@/stores/session'

// Composables
import getData from '@/composables/getData'
import getSessions from '@/composables/getSessions'
import { dateToYYYYMMDD } from '@/composables/functions'

// Components
import OnlineColleagueAccordion from '@/components/OnlineColleagueAccordion.vue'

// Refs
const { allRunningSessions } = storeToRefs(useSessionStore())
const { statusesOfToday } = storeToRefs(useDataStore());
// const today = new Date();

// Lifecycle
onMounted(async () => {
  statusesOfToday.value = await getData('statuses', null, dateToYYYYMMDD(new Date()))
  allRunningSessions.value = await getSessions(null, null, true)

  setInterval(async () => {
    statusesOfToday.value = await getData('statuses', null, dateToYYYYMMDD(new Date()))
    allRunningSessions.value = await getSessions(null, null, true)
    
  }, 20000);
})
</script>
<style scoped>
h3 {
  font-size: 12px;
  color: #8F8F8F;
}

</style>