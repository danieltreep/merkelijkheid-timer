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

const props = defineProps({
    task: Object,
    selectedIds: Array
})
const emit = defineEmits(['handleClick'])

const selected = ref(true);

onUpdated(() => {
    // console.log(props.selectedIds)
    selected.value = props.selectedIds.includes(props.task.task_id)
})

function handleClick() {
    // selected.value = !selected.value
    emit('handleClick', props.task.task_id)
}
</script>
<style scoped>
    
</style>