<template>
    <li class="list-group-item d-grid p-3" v-if="!isEditing">
        <div>{{ session.title }}</div>
        <div>
          {{
            projects.find(
              (project) => +session.project_id === project.id
            ).project_name
          }}:
          {{
            categories.find(
              (category) => +session.category_id === category.id
            ).category_name
          }}
        </div>
        <div class="time d-flex ms-auto align-items-center gap-2">
          <div class="started">
            {{ prefixZero(new Date(session.created_at).getHours()) }}:{{
              prefixZero(new Date(session.created_at).getMinutes())
            }}
          </div>
          <div>-</div>

          <div class="started">
            {{ prefixZero(new Date(session.stopped_at).getHours()) }}:{{
              prefixZero(new Date(session.stopped_at).getMinutes())
            }}
          </div>
        </div>
        
        <div class="elapsed">
          <b>
            {{ session.time_elapsed.slice(0, 5) }}
              
          </b>
        </div>
        <div class="buttons d-flex gap-2">
            <EditButton @click="isEditing = true"/>
            <DeleteButton table="sessions" :id="session.id" />
        </div>
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

<style scoped>
li.d-grid {
    grid-template-columns: minmax(50px, 150px) 1fr 110px 45px 90px;
    gap: 1rem;
    align-items: center;
}
</style>