<template>
  <main class="pb-5 pt-2 row">
    <div class="col-2">
        <OnlineColleagues />
      </div>
      <div class="col-10">
        <Calendar />
      </div>
    
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRoute } from 'vue-router'

// Components
import Calendar from '@/components/calendar/Calendar.vue'
import OnlineColleagues from '@/components/OnlineColleagues.vue'

</script>

<style scoped>

</style>