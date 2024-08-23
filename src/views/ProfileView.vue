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
import { onBeforeMount, ref, watch, computed, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/data';
import { useUserStore } from '@/stores/user';
import getData from '@/composables/getData';

// Components
import Calendar from '@/components/calendar/Calendar.vue'
import OnlineColleagues from '@/components/OnlineColleagues.vue'

const { statuses } = storeToRefs(useDataStore())
const { user } = storeToRefs(useUserStore())

onMounted(async () => {
    statuses.value = await getData('statuses', user.value.user_id)
})

</script>

<style scoped>

</style>