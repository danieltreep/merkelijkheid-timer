<template>
  <main class="row">
      <div class="col-7 mb-4">
        <DeliverableList :deliverables="deliverables" />

        <!-- {{ deliverables }} -->
      </div>
      <DeliverableNotitiesModal />
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

// Stores
import { useDeliverablesStore } from "@/stores/deliverables";
import { useDataStore } from "@/stores/data";
import { useUserStore } from "@/stores/user";

// Composables
import getData from "@/composables/getData";

// Components
import DeliverableList from "@/components/deliverables/DeliverableList.vue";
import DeliverableNotitiesModal from "@/components/deliverables/DeliverableNotitiesModal.vue";

// Refs
const { projects, clients, tasks } = storeToRefs(useDataStore());
const { deliverables } = storeToRefs(useDeliverablesStore());
const { user } = storeToRefs(useUserStore())
const { users } = storeToRefs(useUserStore())
let intervalId;

// Methods
onMounted(async () => {
  clients.value = await getData('clients');
  users.value = await getData('users')
  deliverables.value = await getData('upcoming_weeks_deliverables', user.value.user_id)
  projects.value = await getData('projects');
  tasks.value = await getData('tasks')

  intervalId = setInterval(async () => {
    deliverables.value = await getData('upcoming_weeks_deliverables', user.value.user_id);
  }, 100000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<style scoped>


</style>
