<template>
  <div>
    <ul class="list-group" v-if="data">
      <li
        v-for="(session, index) in data.sessions"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center gap-3 p-3"
      >
        <div>{{ session.title }}</div>
        <div>
          {{
            data.projects.filter(
              (project) => session.project_id === project.id
            )[0].project_name
          }}:
          {{
            data.categories.filter(
              (category) => session.category_id === category.id
            )[0].category_name
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
        <EditButton :sessionId="session.id" />
        <DeleteButton :sessionId="session.id" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import DeleteButton from "@/components/DeleteButton.vue";
import EditButton from "@/components/EditButton.vue";
const { data } = storeToRefs(useDataStore());

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>
