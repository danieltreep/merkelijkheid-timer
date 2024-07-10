<template>
    <button class="more-button"  @click="openOptions = !openOptions" >
      <img src="@/assets/more-icon.svg" >
    </button>

    <div class="options position-absolute p-2 d-flex flex-column text-start" v-if="openOptions">
      <button class="btn" data-bs-toggle="modal" data-bs-target="#changeDateModal" @click="handleDateChange()">
        <img src="@/assets/date-icon-black.svg" class="me-2" alt="">
        Change date
      </button>
      <button class="btn delete-button" @click="handleDelete()">
        <img src="@/assets/delete-icon.svg" class="me-2" alt="">
        Delete
      </button>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/stores/session'
import deleteData from "@/composables/deleteData";

const { sessionDateChange } = storeToRefs(useSessionStore())

const props = defineProps({
    session: Object
})

const openOptions = ref(false);

function handleDelete() {
  openOptions.value = false;
  deleteData('sessions', props.session.session_id)
}

function handleDateChange() {
  openOptions.value = false;
  sessionDateChange.value = props.session;
}
</script>
<style scoped>
.options {
  right: 0;
  background-color: white;
  top: 100%;
  border: 1px solid var(--border);
  border-radius: var(--br);
  box-shadow: var(--bs);
  z-index: 1;
}
.btn {
  font-size: 14px;
  text-align: start;
  display: flex;
  align-items: center;
  gap: .2rem;
}
.btn img {
  width: 13px;
}
.btn:hover {
  background-color: var(--hover);
}
.delete-button {
  color: #EE7170;
}

</style>