<template>
  <div>
    <ul class="list-group" v-if="data">
      <li
        v-for="(session, index) in data.sessions"
        :key="index"
        class="list-group-item d-flex"
      >
        {{ session.title }}
        <div class="started">
          {{ prefixZero(new Date(session.created_at).getUTCHours()) }}:{{
            prefixZero(new Date(session.created_at).getUTCMinutes())
          }}
        </div>
        <p>-</p>
        <div class="started">
          {{ prefixZero(new Date(session.stopped_at).getUTCHours()) }}:{{
            prefixZero(new Date(session.stopped_at).getUTCMinutes())
          }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
const { data } = storeToRefs(useDataStore());

function prefixZero(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}
</script>

<style scoped></style>
