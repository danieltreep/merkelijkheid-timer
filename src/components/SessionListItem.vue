<template lang="">
    <li class="list-group-item d-flex justify-content-between align-items-center gap-3 p-3" v-if="!isEditing">
        <div>{{ session.title }}</div>
        <div>
          {{
            projects.find(
              (project) => session.project_id === project.id
            ).project_name
          }}:
          {{
            categories.find(
              (category) => session.category_id === category.id
            ).category_name
          }}
        </div>
        <div class="time d-flex ms-auto align-items-center gap-2">
          <div class="started">
            {{ prefixZero(new Date(session.created_at).getUTCHours()) }}:{{
              prefixZero(new Date(session.created_at).getUTCMinutes())
            }}
          </div>
          <div>-</div>

          <div class="started">
            {{ prefixZero(new Date(session.stopped_at).getUTCHours()) }}:{{
              prefixZero(new Date(session.stopped_at).getUTCMinutes())
            }}
          </div>
        </div>
        <div class="elapsed">
          <b>
            {{ prefixZero(new Date(session.time_elapsed).getUTCHours()) }}:{{
              prefixZero(new Date(session.time_elapsed).getUTCMinutes())
            }}
          </b>
        </div>
        <EditButton @click="isEditing = true"/>
        <DeleteButton db="sessions" :id="session.id" />
      </li>
      <SessionListItemEdit v-if="isEditing" :session="session" :projects="projects" :categories="categories" @handleSave="isEditing = false"/>
</template>
<script setup>

import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import SessionListItemEdit from "@/components/SessionListItemEdit.vue";
import { ref } from "vue";

defineProps({
    session: Object,
    projects: Array,
    categories: Array
})

const isEditing = ref(false);

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}

</script>