<template >
    <button
          class="btn btn-outline-dark"
          type="button"
          :disabled="disabled"
          @click="handleAdd(table, data)"
        >
          {{ text }}
        </button>
</template>
<script setup>
import postData from "@/composables/postData";

defineProps({
    disabled: Boolean,
    text: String,
    table: String,
    data: Object,
})

const emit = defineEmits(['resetValues']);

async function handleAdd(table, data) {
  await postData(table, data);
  emit('resetValues');
}
</script>
