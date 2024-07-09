<template>
    <button class="more-button"  @click="openOptions = !openOptions" >
      <img src="@/assets/more-icon.svg" >
    </button>

    <div class="options position-absolute p-2" v-if="openOptions">
      <button class="btn delete-button" @click="handleDelete()">
        <img src="@/assets/delete-icon.svg" class="me-2" alt="">
        Delete
      </button>
    </div>
</template>
<script setup>
import { ref } from "vue";
import deleteData from "@/composables/deleteData";

const props = defineProps({
    id: String,
})

const openOptions = ref(false);

function handleDelete() {
  openOptions.value = false;
  deleteData('sessions', props.id)
}
</script>
<style scoped>
.options {
  right: 0;
  background-color: white;
  top: 100%;
  border-radius: var(--br);
  box-shadow: var(--bs);
  z-index: 1;
}
.delete-button {
  font-size: 14px;
  color: #EE7170;
}
.delete-button:hover {
  background-color: var(--hover);
}
</style>