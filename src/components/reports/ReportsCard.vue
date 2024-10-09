<template>
    <div class="reports-card p-4" @click="$router.push({name: 'clientreportpage', params: {clientid: client.client_id}})">
        <div class="d-flex justify-content-between">
            <div>
                <div class="client d-flex align-items-center">
                    <img :src="client.sessions[0]?.logo" class="small-logo">
                    <p class="mb-0 ms-2">{{ client.client_name }}</p>
                </div>
                <div class="percentage mt-2"  :class="positive ? 'up' : 'down'">
                    <span v-if="lastMonthTotalInTask">{{ lastMonthTotalInTask }} last month</span>
                    <span v-else>&nbsp;</span>
                </div>
            </div>
        </div>
        <p class="big-number">{{ client.total_time_elapsed }}</p>

        <div class="bar-wrapper d-flex">
            <ReportsCardBarSection v-for="(task, index) in groupSessionsByTask" :key="task.task_id" :index="index" :task="task" :total_time_elapsed="client.total_time_elapsed"/>
        </div>

       
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportsStore } from '@/stores/reports';
import { reduceTimeElapsed, calculateChange } from '@/composables/functions';

import ReportsCardBarSection from '@/components/reports/ReportsCardBarSection.vue'

const positive = ref(false)
const { lastMonthGroupedByClient } = storeToRefs(useReportsStore());


const props = defineProps({
    client: Object
})

const groupSessionsByTask = computed(() => {
    const groupedByTask = props.client.sessions.reduce((acc, session) => {

        const { task_id, taskname, taskcolor } = session

        if (!acc[task_id]) {
            acc[task_id] = {
                task_id, 
                taskname,
                total_time_in_task: '',
                taskcolor,
                sessions: []
            }
        }
        acc[task_id].sessions.push(session)

        return acc;
    }, {})

    Object.values(groupedByTask).forEach(task => {
        task.total_time_in_task = reduceTimeElapsed(task.sessions);
    });

    return Object.values(groupedByTask)
})

const lastMonthTotalInTask = computed(() => {

    const lastMonthSessionsByThisClient = lastMonthGroupedByClient.value.find(client => client.client_id === props.client.client_id);
    
    if (lastMonthSessionsByThisClient) {
        const change = calculateChange(props.client.total_time_elapsed, lastMonthSessionsByThisClient.total_time_elapsed);

        if (change.includes('-')) {
            positive.value = false;
            return change.substring(1)
        } else {
            positive.value = true;
            return change
        }
        
    } else {
        return '-'
    }
})

</script>

<style scoped>
.reports-card {
    background-color: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
    cursor: pointer;
}

.big-number {
    font-size: 50px;
    font-family: 'Red Ring', sans-serif;
}
.bar-wrapper {
    height: 7px;
    /* position: relative; */
    border-radius: 8px;
}
.bar:not(:first-child) {
    margin-left: -5px;
}
.avatar {
    margin-left: -10px;
}
</style>