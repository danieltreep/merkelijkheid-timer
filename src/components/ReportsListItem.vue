<template>
    
    <div class="accordion-item">
        <div class="accordion-header gap-3">
            <div class="position-relative d-flex align-items-center">
                <button v-if="filterSessionsByProject.length" class="btn show-content-button d-flex align-items-center me-4 gap-2 justify-content-center collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#accordion-${project.project_id}`" aria-expanded="true" :aria-controls="`accordion-${project.project_id}`">
                    {{ filterSessionsByProject.length }} 
                    <img src="@/assets/chevron-icon.svg" alt="">
                </button>
                <div class="bolletje me-3" :style="{backgroundColor: project.color}"></div>
                <p class="mb-0 me-3">{{ project.client_name }}</p>
                <div class="project" :class="project.project_name === 'General' ? 'pinguin' : '' ">{{ project.project_name === 'General' ? '🐧' : project.project_name }}</div>
            </div>
            <div class="duur">{{reduceTimeElapsed(filterSessionsByProject)}}</div>
        </div>
        <div :id="`accordion-${project.project_id}`" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body p-0">
                
                <li class="list-group-item list-item-accordion py-2 d-grid align-items-center" v-for="session in filterSessionsByProject" :key="session.session_id">
                    {{ session.title }}
                    <div class="collega d-flex align-items-center gap-2">
                        <img class="avatar" :src="userOfProject(session.user_id).photo" alt="">
                        {{ userOfProject(session.user_id).username }}
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <img src="@/assets/date-icon.svg" alt="">
                        {{ formatDate(new Date(session.created_at)) }}
                    </div>
                    <div class="duur">{{ session.time_elapsed.slice(0, -3)}}</div>
                </li>
             
            </div>
        </div>
    </div>
   

</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatDate } from '@/composables/functions'

import { useDataStore } from '@/stores/data'
import { useUserStore } from '@/stores/user'

const { sessions } = storeToRefs(useDataStore())
const { users } = storeToRefs(useUserStore());

const props = defineProps({
    project: Object
})

const userOfProject = (userId) => {
    return users.value.find(user => user.user_id === userId);
}

const filterSessionsByProject = computed(() => {
    return sessions.value.filter(session => session.project_id === props.project.project_id)
}) 

function reduceTimeElapsed(sessions) {
    let totalSeconds = 0;

    sessions.forEach(session => {
        const [hours, minutes, seconds] = session.time_elapsed.split(':').map(Number);
        totalSeconds += (hours * 3600) + (minutes * 60);
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const totalMinutes = Math.floor(totalSeconds / 60);

    const formattedTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
    return formattedTime;
}

</script>
<style scoped>
.accordion {
    border-radius: 0;
    box-shadow: none;
}
.accordion-item {
    border-radius: 0;
    overflow: hidden;
    border: none;
    border-bottom: 1px solid #EDEEF1;
}
.accordion:last-of-type{
    border-radius: 0 0 var(--br) var(--br);
    /* border: none; */
}
.accordion-header {
    grid-template-columns: 1fr 67px;
    display: grid;
    font-size: 14px;
    padding-block: .7rem;
}
.accordion-header {
    padding-inline: 2rem 1rem;
}
.accordion-body {
    background-color: #F9F9F9;
    padding-inline: 0;
}

.list-item-accordion {
    background-color: transparent;
    padding-right: 1.8rem;
    grid-template-columns: 55% 1fr 1fr 55px;
}
.show-content-button {
    border: 1px solid var(--border);
    width: 50px;
    border-radius: 30px;
    font-size: 12px;
}
.duur {
  font-size: 20px;
  font-weight: 500;
}
.btn img {
    transform: rotate(-180deg);
    transition: .3s;
}
.btn.collapsed img {
    transform: rotate(0);
}
.avatar {
    height: 22px;
    width: 22px;
    border-radius: 50%;
}
</style>