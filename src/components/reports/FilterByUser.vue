<template>
    <div class="position-relative mt-auto pe-4">
        <button class="d-flex align-items-center open-options" @click="show = !show">
            <img class="small-avatar" v-if="filterUser.photo" :src="filterUser.photo">
            {{ filterUser.username ? filterUser.username : 'Iedereen' }}
            <img class="ms-2" src="@/assets/chevron-icon.svg">
        </button>
    
        <div class="task-tooltip position-absolute" v-if="show">
            <ul class="list-group p-2" >
                
                <li class="d-flex align-items-center gap-2 colleague" @click="changeUser({})">
                    <div class="avatar-wrapper" :class="!filterUser.user_id ? 'added' : ''">
                        <img class="avatar-inline" src="@/assets/merkelijkheid-logo.png" >
                    </div>
                    Iedereen
                </li>

                <li 
                    v-for="colleague in users"
                    class="d-flex align-items-center gap-2 colleague" 
                    
                    @click="changeUser(colleague)"
                >
                    <div class="avatar-wrapper" :class="filterUser.user_id === colleague.user_id ? 'added' : ''">
                        <img class="avatar-inline" :src="colleague.photo" >
                    </div>
                    {{ colleague.username }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// Stores
import { useUserStore } from "@/stores/user";
import { useReportsStore } from "@/stores/reports";

// Refs
const { users } = storeToRefs(useUserStore())
const { filterUser } = storeToRefs(useReportsStore())
const show = ref(false)

// Methods
function changeUser(user) {
    show.value = false
    filterUser.value = user

}

</script>

<style scoped>

.task-tooltip {
    background-color: white;
    right: 20%;
    width: 220px;
    z-index: 100;
    top: calc(100% + 15px);
    border-radius: var(--br);
    border: 1px solid #E8E8E8;
}

button.open-options {
    background-color: white;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    padding: .5rem 1rem;
    height: 34px;
}
.task-tooltip::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: white;
    top: -7px;
    right: 33px;
    border-left: 1px solid var(--border);
    border-top: 1px solid var(--border);
    transform: rotate(45deg);
    border-radius: 3px 0 0 0;
}

.avatar-inline {
    height: 27px;
    width: 27px;
    border-radius: 50%;
}
.avatar-wrapper {
    border: 2px solid transparent;
    padding: 1px;
    border-radius: 50%;
}
button.select-button {
    background-color: #A53EF415;
    color: var(--paars);
    font-weight: 500;
    width: 100%;
}
.colleague {
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: .2rem .3rem;
    width: 100%;
    border-radius: 8px;
}

.colleague:hover {
    background-color: var(--hover);
}

.colleague:hover .avatar-wrapper {
    border: 2px solid var(--paars);
}
.avatar-wrapper.added {
    border: 2px solid var(--paars);
}
.small-avatar {
    height: 20px;
    width: 20px;
    margin-right: 8px;
}
</style>