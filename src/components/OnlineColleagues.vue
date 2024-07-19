<template >
    <div class="online-colleagues d-flex ms-5">
        <div v-for="session in runningSessionsFromOthers" :key="session.session_id">
          <div class="avatar-wrapper position-relative">
            <img :src="session.photo" alt="">
            <div class="indicator"></div>
            
          </div>
        </div>
    </div>
</template>
<script setup>
import getSessions from '@/composables/getSessions'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());

const runningSessions = ref([]);

const runningSessionsFromOthers = computed(() => {
  return runningSessions.value.filter(session => +session.user_id !== +user.value.user_id)
})

onMounted(() => {

  setInterval(async () => {
    runningSessions.value = await getSessions(null, 7, true)
    
  }, 20000);
})

</script>
<style scoped>

.avatar-wrapper img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 2px solid white;
}

.avatar-wrapper {
  margin-left: -10px;
}

.indicator {
  height: 10px; 
  width: 10px;
  border-radius: 50%;
  background-color: var(--groen);
  border: 1.5px solid white;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>