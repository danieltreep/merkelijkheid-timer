<template>
    <button 
        class="project" 
        :class="selected ? 'selected' : '' "
        @click="handleClick"
    >{{ task.taskname }}
    </button>
</template>
<script setup>
import { ref, onUpdated } from 'vue'

// Props and emits
const emit = defineEmits(['handleClick'])
const props = defineProps({
    task: Object,
    selectedIds: Array
})

// Refs
const selected = ref(true);

// Methods
function handleClick() {
    selected.value = !selected.value
    emit('handleClick', props.task.task_id)
}

// Lifecycle
onUpdated(() => {
    selected.value = props.selectedIds.includes(props.task.task_id)
})

</script>
<style scoped>
.project.selected {
    background-color: #EFE3F6;
    border: 2px solid var(--paars);
    color: var(--paars);
}
.project {
    border: 2px solid transparent;
}
</style>