<template >
    <button
          class="btn btn-outline-dark"
          type="button"
          :disabled="disabled"
          @click="handleAdd(db, data)"
        >
          {{ text }}
        </button>
</template>
<script setup>
import postData from "@/composables/postData";


defineProps({
    disabled: Boolean,
    text: String,
    db: String,
    data: Object,
})

const emit = defineEmits(['resetValues']);

function handleAdd(db, data) {
  postData(db, data);

  emit('resetValues')
}
</script>
<style >
    
</style>