<template>
    <div class="block p-4 position-relative">
        <div class="d-flex">
            <h2>To do</h2>
    
            <button class="bg-transparent border-0 add-todo ms-auto" data-bs-target="#addTodoModal" data-bs-toggle="modal">Add
                <!-- <img src="@/assets/icon-plus.svg" alt=""> -->
            </button>
        </div>

        <!-- <VueDraggableNext class="mt-4 position-relative drag-list" v-model="todos" :sort="false" group="todos"> -->
        <VueDraggableNext class="mt-4 position-relative drag-list" v-model="todos">
            <TransitionGroup name="list">
                <ToDoListItem v-for="todo in todos" :key="todo.todo_id" :todo="todo" />
            </TransitionGroup>
        </VueDraggableNext>
        
        <div class="position-relative" slot="footer">
            <div class="drop-here w-100 p-3 mb-2">
                <button class="bg-transparent border-0 add-todo ms-auto" data-bs-target="#addTodoModal" data-bs-toggle="modal">Click here</button> to add a todo
            </div>
        </div>

        <AddTodoModal />
        <AddTaskModal />
    </div>
</template>

<script setup>
import { VueDraggableNext } from 'vue-draggable-next'
import { storeToRefs } from "pinia";

// Stores
import { useDeliverablesStore } from "@/stores/deliverables";

// Components
import ToDoListItem from "@/components/todos/ToDoListItem.vue";
import AddTodoModal from '@/components/modals/AddTodoModal.vue';
import AddTaskModal from '@/components/modals/AddTaskModal.vue';

const { todos } = storeToRefs(useDeliverablesStore());

</script>

<style scoped>
.block {
    background-color: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
}
h2 {
    font-size: 18px;
    font-family: 'Red Ring';
    margin-bottom: 0;
}

.drop-here {
    border: 1px dashed var(--border-licht);
    border-radius: var(--br);
    background-color: transparent;
    /* width: 100%; */
    text-align: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
}
.add-todo {
    font-size: 14px;
    padding: 0;
    color: var(--paars);
    font-weight: 500;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>