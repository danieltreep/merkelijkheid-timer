<template lang="">
  <li
      
      class="list-group-item d-flex justify-content-between align-items-center gap-2 p-3"
    >
      <!-- <div>{{ title }}</div> -->
      <input type="text" v-model="title" class="form-control">
      <select class="form-select w-50" v-model="project_id">
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.project_name }}
        </option>
      </select>
      <select class="form-select w-50" v-model="category_id">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.category_name }}
        </option>
      </select>
      
        <div class="d-flex align-items-center gap-1">
            <input v-model="startedHours" class="form-control time">:
            <input v-model="startedMinutes" class="form-control time">
          </div>
          -
        <div class="d-flex align-items-center gap-1">
            <input v-model="stoppedHours" class="form-control time">:
            <input v-model="stoppedMinutes" class="form-control time">
          </div>
      
     
    
      <SaveButton @click="handleSave('sessions', session.id, {title, category_id, project_id} )"/>
      
    </li>

</template>
<script setup>
import SaveButton from "@/components/SaveButton.vue";
import patchData from "@/composables/patchData";

import { ref } from "vue";

const props = defineProps({
  session: Object,
  projects: Array,
  categories: Array
})

const emit = defineEmits(['handleSave']);

const title = ref(props.session.title);
const project_id = ref(props.session.project_id);
const category_id = ref(props.session.category_id);

const stopped_at = new Date(props.session.stopped_at);
const created_at = new Date(props.session.created_at);
const stoppedHours = ref(prefixZero(new Date(props.session.stopped_at).getUTCHours()));
const stoppedMinutes = ref(prefixZero(new Date(props.session.stopped_at).getUTCMinutes()));
const startedHours = ref(prefixZero(new Date(props.session.created_at).getUTCHours()));
const startedMinutes = ref(prefixZero(new Date(props.session.created_at).getUTCMinutes()));

function handleSave(db, id, data) {
  
  stopped_at.setUTCHours(stoppedHours.value, stoppedMinutes.value);
  created_at.setUTCHours(startedHours.value, startedMinutes.value);
  const time_elapsed = new Date(stopped_at - created_at);
  
  emit('handleSave')
  patchData(db, id, {...data, stopped_at, created_at, time_elapsed});
}

function prefixZero(n) {
if (n < 10) {
  return "0" + n;
}
return n;
}

</script>

<style scoped>
.time {
  width: 46px;
}
</style>