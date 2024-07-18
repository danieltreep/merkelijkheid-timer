<template>
    <div class="project-selector position-absolute">
        <div class="searchwrapper p-3 pb-0 bg-white sticky-top">
            <input type="text" class="w-100 search mb-3 " placeholder="Search client" v-model="searchterm">
        </div>
        <div class="listwrapper p-3 px-4 pt-0">
            <div v-for="client in clientsNotArchived" :key="client.id" class="py-3  list-item d-flex justify-content-between">
                <div class="d-flex align-items-center  gap-3">
                    <div class="bolletje" :style="{ backgroundColor: client.color }"></div>
                    <p class="mb-0 bedrijf">{{ client.client_name }}</p>
                </div>
                    
                <div>
                    <button 
                        v-for="(project, index) in filterProjectsByClient(client.client_name)" 
                        :key="index"
                        @click="() => handleCLick(project)"
                        class="ms-2"
                        :class="project.project_name === 'General' ? 'pinguin' : '' "
                        data-bs-toggle="modal" :data-bs-target="target === 'addTask' ? '#addTaskModal' : '#changeTaskModal'"
                    >
                        {{ project.project_name === 'General' ? '🐧' : project.project_name }}
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const { projects, searchterm, clientsNotArchived, projectToBePatched } = storeToRefs(useDataStore());

const emit = defineEmits(['handleClick']);

function filterProjectsByClient(client) {
    return projects.value.filter(project => project.client_name === client);
}

function handleCLick(project) {
    emit('handleClick', project);
    projectToBePatched.value = project
    searchterm.value = '';
}

const props = defineProps({
    target: String
})

</script>
<style scoped>

.project-selector {
    background-color: white;
    border-radius: 0 0 var(--br) var(--br);
    width: 380px;
    top: calc(100% + 10px);
    box-shadow: var(--bs);
    z-index: 1;
    max-height: 350px;
    overflow-y: scroll;
}
.bedrijf {
    font-weight: 500;
}
.search {
    border: 1px solid var(--border);
    border-radius: var(--br);
    padding: .5rem 1rem;
    outline: none;
}
.list-item:not(:last-child) {
    border-bottom: 1px solid #EDEEF1;
}
button {
    background-color: var(--tag);
    padding: .4rem 1.5rem;
    border-radius: 30px;
    width: fit-content;
    font-size: 12px;
    font-weight: 500;
    border: none;
    transition: .1s;
}
button:hover {
  background-color: #D8D8D8;
}

</style>