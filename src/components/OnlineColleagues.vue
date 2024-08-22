<template >
    
  <OnlineColleagueAccordion id="1" title="🐧 Office" />
  <OnlineColleagueAccordion id="2" title="🏡 Home" />
  <OnlineColleagueAccordion id="3" title="☕ Office no lunch" />
  <OnlineColleagueAccordion id="4" title="⛔️ Fixed day off" />
  <OnlineColleagueAccordion id="5" title="🏖️ Vacation day" />
  <OnlineColleagueAccordion id="6" title="🤮 Sick" />
  <OnlineColleagueAccordion id="7" title="🎄 Holiday" />
  <OnlineColleagueAccordion id="8" title="👻 Unknown" />

</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from "pinia";

// Stores
import { useUserStore } from '@/stores/user'

// Composables
import getSessions from '@/composables/getSessions'

// Components
import OnlineColleagueAccordion from '@/components/OnlineColleagueAccordion.vue'

// Refs
const { user } = storeToRefs(useUserStore());
const runningSessions = ref([]);

const runningSessionsFromOthers = computed(() => runningSessions.value.filter(session => +session.user_id !== +user.value.user_id))

// Lifecycle
onMounted(() => {

  setInterval(async () => {
    runningSessions.value = await getSessions(null, 7, true)
    
  }, 20000);
})

</script>
<style scoped>


</style>