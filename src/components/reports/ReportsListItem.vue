<template>
    
    <div class="accordion-item" v-if="filterSessionsByProject.length">
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
                    <div class="collega d-grid align-items-center justify-content-center gap-2">
                        <div class="d-flex justify-content-end">
                            <div v-if="session.shared_with.length" class="colleague-avatars">
                                <img class="avatar" v-for="colleague in session.shared_with" :src="userOfProject(colleague).photo" :key="colleague.user_id" >
                            </div>
                            <img class="avatar" :src="userOfProject(session.user_id).photo">
                        </div>
                        <div>
                            {{ userOfProject(session.user_id).username }}
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <img src="@/assets/date-icon.svg" alt="">
                        {{ formatDate(new Date(session.created_at)) }}
                    </div>
                    <div class="duur">{{ session.time_elapsed.slice(0, -3)}} <span class="superscript ms-1" v-if="session.shared_with.length">x{{ session.shared_with.length + 1 }}</span></div>
                </li>
            </div>
        </div>
    </div>
   

</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

// Stores
import { useDataStore } from '@/stores/data'
import { useUserStore } from '@/stores/user'

// Composables
import { formatDate } from '@/composables/functions'

// Props
const props = defineProps({
    project: Object
})

// Refs
const { sessions } = storeToRefs(useDataStore())
const { users } = storeToRefs(useUserStore());

const filterSessionsByProject = computed(() => sessions.value.filter(session => session.project_id === props.project.project_id)) 

// Methods
function userOfProject(userId) {
    return users.value.find(user => user.user_id === userId);
}

function reduceTimeElapsed(sessions) {
    let totalSeconds = 0;

    sessions.forEach(session => {

        let amountOfColleagues = 1;
        
        if (session.shared_with) {
            amountOfColleagues += session.shared_with.length; // Als sessie gedeeld is tel op bij aantal collega's
        }

        const [hours, minutes, seconds] = session.time_elapsed.split(':').map(Number);
        totalSeconds += ((hours * amountOfColleagues) * 3600) + ((minutes * amountOfColleagues) * 60);
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
    grid-template-columns: 45% 1.5fr 1fr 55px;
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
  display: flex;
  align-items: center;
}
.btn img {
    transform: rotate(-180deg);
    transition: .3s;
}
.btn.collapsed img {
    transform: rotate(0);
}
.avatar {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: 1px solid white;
}
.collega {
    margin-right: 5rem;
    grid-template-columns: 1fr 1fr;
}

.colleague-avatars img {
    margin-right: -10px;
}
.superscript {
    font-size: 11px;
    color: rgb(110, 110, 110);
    font-weight: 400;
}

@media (max-width: 768px) {
    .accordion-header {
        padding-inline: 1rem;
    }
}
</style>