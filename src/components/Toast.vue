<template>
  <Transition>
    <div class="toast-wrapper d-flex justify-content-between p-2 px-3" v-if="toast.show" :style="{backgroundColor: toast.error ? 'var(--rood)' : 'var(--groen)'}">
      {{ toast.message }}
    </div>
  </Transition>
 
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data';

const { toast } = storeToRefs(useDataStore())

</script>

<style  scoped>
.toast-wrapper {
  /* background-color: var(--groen); */
  box-shadow: var(--bs);
  /* border: 1px solid var(--groen); */
  width: fit-content;
  color: white;
  border-radius: 8px;
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  font-size: 14px;
}
button {
  scale: .7;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>