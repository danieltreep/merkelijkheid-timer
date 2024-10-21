<template>
  <main class="row">
      <div class="col-7">
        <DeliverableList />
      </div>
      <div class="col-5">
        <ToDoList />
      </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

// Stores
import { useDeliverablesStore } from "@/stores/deliverables";
import { useDataStore } from "@/stores/data";

// Composables
import getData from "@/composables/getData";

// Components
import DeliverableList from "@/components/deliverables/DeliverableList.vue";
import ToDoList from "@/components/todos/ToDoList.vue";
import { useUserStore } from "@/stores/user";

// Refs
const { projects, clients, statuses, tasks } = storeToRefs(useDataStore());
const { deliverables, todos } = storeToRefs(useDeliverablesStore());
const { user, users } = storeToRefs(useUserStore())
let intervalId;

// Methods
onMounted(async () => {
  projects.value = await getData('projects');
  clients.value = await getData('clients');
  statuses.value = await getData('statuses'); // Outcomment na build
  deliverables.value = await getData('deliverables')
  users.value = await getData('users')
  todos.value = await getData('todos', user.value.user_id)
  tasks.value = await getData('tasks')

  intervalId = setInterval(async () => {
    deliverables.value = await getData('deliverables');
    todos.value = await getData('todos', user.value.user_id);
  }, 100000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<style scoped>


</style>
