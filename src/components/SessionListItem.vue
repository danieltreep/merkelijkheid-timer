<template>
    <li class="list-group-item d-grid py-2 pe-2 position-relative" v-if="!isEditing">
        <div>{{ session.title }}</div>
        <div class="d-flex align-items-center gap-3">
          <div class="bedrijf d-flex align-items-center gap-2">
            <div class="bolletje" :style="{ backgroundColor: session.color }"></div>
            {{ session.client_name }}
            </div>
            <div class="project">
            {{ session.project_name }}

          </div>
        </div>
        <div class="time align-items-center gap-2">
          <img src="@/assets/clock-icon.svg" alt="">
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
          <p class="mb-0">{{ session.time_elapsed.slice(0, 5) }}</p>
        </div>

        <button class="play-button">
          <img src="@/assets/play-icon.svg" alt="Start deze taak">
        </button>

        <button class="more-button">
          <img src="@/assets/more-icon.svg" >
        </button>

        <div class="buttons d-flex gap-2 d-none">
            <EditButton @click="isEditing = true"/>
            <DeleteButton table="sessions" :id="session.id" />
        </div>
      </li>
      <SessionListItemEdit v-if="isEditing" :session="session" :projects="projects" @handleSave="isEditing = false"/>
</template>
<script setup>
import { ref } from "vue";

import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import SessionListItemEdit from "@/components/SessionListItemEdit.vue";

defineProps({
    session: Object,
})

import { useDataStore } from '@/stores/data'
import { storeToRefs } from "pinia";

const { projects } = storeToRefs(useDataStore());

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
  grid-template-columns: minmax(max-content, 35%) 5fr 4fr 1.1fr 40px 40px;
  align-items: center;
}

.list-group-item {
  border: none;
  padding-left: 2rem;
  font-size: 14px;
}
.list-group-item:not(:last-child) {
  border-bottom: 1px solid #EDEEF1;
}
.time {
  display: grid;
  grid-template-columns: 20px 45px 15px 50px;
}
.elapsed {
  font-size: 18px;
  font-weight: 500;
}
.project {
  background-color: var(--tag);
  padding: .4rem 1.5rem;
  border-radius: 30px;
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
}
.play-button, .more-button {
  border: none;
  background-color: transparent;
  padding: .6rem;
  border-radius: var(--br);
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-button:hover, 
.more-button:hover {
  background-color: var(--hover);
}
.bolletje {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
</style>