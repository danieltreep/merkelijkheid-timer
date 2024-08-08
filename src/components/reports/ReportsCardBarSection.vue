<template>
   
    <div class="bar" :style="{backgroundColor: task.taskcolor, width: width, zIndex: `${20 - index}`}">
        <div class="bar-tooltip text-center px-2">{{ task.taskname }} <br> {{ task.total_time_in_task }}</div>
    </div>
   
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    total_time_elapsed: String,
    task: Object,
    index: Number
})

const width = computed(() => {
    const totalTimeInTaskSeconds = timeStringToSeconds(props.task.total_time_in_task);
    const totalTimeElapsedSeconds = timeStringToSeconds(props.total_time_elapsed);

    const percentage = (totalTimeInTaskSeconds / totalTimeElapsedSeconds) * 100;
    return `${percentage.toFixed(2)}%`;
})

function timeStringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}

</script>

<style scoped>
.bar {
    height: 100%;
    background-color: var(--paars);
    border-radius: 8px;
    position: relative;
}
.bar:hover .bar-tooltip {
    opacity: 1;
    translate: 0 0;
}
.bar-tooltip {
    position: absolute;
    background-color: #212529;
    color: white;
    font-size: 13px;
    border-radius: 4px;
    left: 50%;
    bottom: 190%;
    transform: translateX(-50%);
    padding-block: 2px;
    opacity: 0;
    translate: 0 4px ;
    transition: .3s;
    width: fit-content;
}

.bar-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: #212529;
    bottom: -7px;
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
    z-index: -1;
    
}
</style>