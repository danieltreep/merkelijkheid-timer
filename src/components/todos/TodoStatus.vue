<template>
    <button class="status d-flex align-items-center justify-content-center" :disabled="disabled" :class="{done: todo.todo_status === 'Done'}" @click="() => handleChangeStatus(todo.todo_status === 'Done' ? null : 'Done')"> 
        <img src="@/assets/check-icon-white.svg">
    </button>
</template>

<script setup>
import { ref } from 'vue'

import patchData from "@/composables/patchData";
import deleteData from '@/composables/deleteData';

const props = defineProps({
    todo: Object,
    disabled: Boolean,
    subtodos: Array
})

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function handleChangeStatus(status) {

    await patchData('todos', props.todo.todo_id, { todo_status: status }, props.todo.deliverable_id)

    if (props.todo.deliverable_id) {
        await patchData('deliverables', props.todo.deliverable_id, { status: status, updated_on: formatDate(new Date()) })
    }

    if (props.todo.has_parent === '0') {
        setTimeout(async () => {
            await deleteData('todos', props.todo.todo_id, props.todo.deliverable_id);
        }, 2000);
    }

    if (props.subtodos && props.subtodos.length > 0) {

        const otherSubtodos = props.subtodos.filter(sub => sub.todo_id !== props.todo.todo_id)
        const parentTodoId = props.subtodos[0].parent_todo_id;
        const parentDeliverableId = props.subtodos[0].parent_deliverable_id;

        const allDone = otherSubtodos.every(sub => sub.todo_status === 'Done');

        if (allDone && status === 'Done') {
            await patchData('todos', parentTodoId, { todo_status: 'Done' }, parentDeliverableId);
            await patchData('deliverables', parentDeliverableId, { status: 'Done', updated_on: formatDate(new Date()) });

            setTimeout(async () => {
                await deleteData('todos', parentTodoId, parentDeliverableId);
                for (const sub of props.subtodos) {
                    await deleteData('todos', sub.todo_id, sub.deliverable_id);
                }

            }, 2000);

        } else {
            await patchData('todos', parentTodoId, { todo_status: null });
            await patchData('deliverables', parentDeliverableId, { status: null, updated_on: formatDate(new Date()) });
        }        
    }
}


</script>

<style scoped>
.status {
    border: 1px solid var(--border-licht);
    border-radius: 50%;

}
.status.done {
   background-color: var(--paars);
    border: 1px solid var(--paars);
    /* z-index: 10; */
}
.status:not(.done):disabled:hover {
    background-color: white;
}
.status img {
    scale: 1.1;
}

</style>