<template>
  <main class="pb-5 row">
    <div class="col-2">
        <OnlineColleagues />
      </div>
      <div class="col-10">
        <Calendar />
        <StatusOverview />
      </div>
    
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch, computed, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/data';
import { useUserStore } from '@/stores/user';
import getData from '@/composables/getData';

// Components
import Calendar from '@/components/calendar/Calendar.vue'
import OnlineColleagues from '@/components/OnlineColleagues.vue'
import StatusOverview from '@/components/calendar/StatusOverview.vue'

const { statuses } = storeToRefs(useDataStore())
const { user, users } = storeToRefs(useUserStore())

onMounted(async () => {
    statuses.value = await getData('statuses', user.value.user_id)
    users.value = await getData('users')
})

</script>

<style scoped>

</style>