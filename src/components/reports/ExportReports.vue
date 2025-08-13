<template>
    <button @click="exportToExcel" class="mt-auto ms-3 export-btn">Export to Excel</button>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { utils, writeFile } from 'xlsx';

// Stores
import { useUserStore } from '@/stores/user';
import { useReportsStore } from '@/stores/reports';

// Composables
import { formatDate, reduceTimeElapsed } from '@/composables/functions'

const props = defineProps({
    sessions: Array,
    task: Object
})

// Refs
const { users } = storeToRefs(useUserStore());
const { filterUser, startDateRef, endDateRef } = storeToRefs(useReportsStore());

const clientName = computed(() => {
    return props.sessions[0].client_name
})

// Methods
function exportToExcel() {
    // Create a new workbook and a worksheet
    const workbook = utils.book_new();
    const worksheetData = [
        [ 'Titel', 'Project', 'Taak', 'Tijd', 'Datum', 'Wie'], // Header row
        ...props.sessions.map(session => [session.title, session.project_name, session.taskname, session.time_elapsed, formatDate(new Date(session.created_at)), userOfProject(session.user_id).username]) // Data rows
    ];
    const worksheet = utils.aoa_to_sheet(worksheetData);

    // Set column widths
    const columnWidths = [
        { wpx: 250 }, // Titel
        { wpx: 200 }, // Project
        { wpx: 150 }, // Taak
        { wpx: 100 }, // Tijd
        { wpx: 100 }, // Datum
        { wpx: 150 }  // Wie
    ];
    worksheet['!cols'] = columnWidths;

    // Append the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, 'Sessions');

    let filename = 'Sessions_';

    if (clientName.value) {
        filename += clientName.value + '_';
    }

    if (filterUser.value.username) {
        filename += filterUser.value.username + '_';
    }

    if (props.task.taskname) {
        filename += props.task.taskname + '_';
    }

    filename += `${formatDate(startDateRef.value)}_${formatDate(endDateRef.value)}.xlsx`;

    // Write the workbook to a file
    writeFile(workbook, filename);
}

function userOfProject(userId) {
    return users.value.find(user => user.user_id === userId);
}


</script>

<style scoped>
.export-btn {
    background-color: white;
    border-radius: 20px;
    border: 1px solid #008000;
    font-size: 12px;
    padding: .5rem 1rem;
    height: 34px; 
}
</style>