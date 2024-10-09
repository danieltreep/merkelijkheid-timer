<template>
    <div class="location-popup">
        <p class="mb-3 fw-medium">Where are you working today?</p>
        
        <div class="d-flex gap-2">
            <input type="radio" name="location" id="office" value="🐧 Office" v-model="location" checked>
            <label for="office">
                <p class="fs-5 mb-0 emoji">🐧</p>
                Office
            </label>
            
            <input type="radio" name="location" id="home" value="🏡 Home" v-model="location" >
            <label for="home">
                <p class="fs-5 mb-0 emoji">🏡</p>
                Home
            </label>

            <input type="radio" name="location" id="halfday" value="☕ Half day" v-model="location" >
            <label for="halfday">
                <p class="fs-5 mb-0 emoji">☕</p>
                Half day
            </label>
        </div>

        <button class="btn select-button mt-3" @click="handleSubmit">Select</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'

import postData from '@/composables/postData';

const { user } = storeToRefs(useUserStore())
const location = ref('🐧 Office')

const emit = defineEmits(['close'])

async function handleSubmit() {
    const today = new Date()

    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    const todayString = `${year}-${month}-${day}`
    
    await postData('statuses', {date: todayString, user_id: user.value.user_id, status: null, location: location.value})

    emit('close')
}
</script>

<style scoped>
.location-popup {
    position: absolute;
    right: -1rem;
    width: 350px;
    font-size: 12px;
    top: calc(100% + 15px);
    background-color: white;
    box-shadow: var(--bs);
    z-index: 10;
    padding: 1.2rem;
    border-radius: var(--br);
    border: 1px solid #E8E8E8;
    z-index: 999;  
}

.location-popup::after {
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
    z-index: -1;
    border-radius: 3px 0 0 0;
}
button.select-button {
    background-color: #A53EF415;
    color: var(--paars);
    font-weight: 500;
    width: 100%;
}

input[type="radio"] {
    display: none;
}
input[type="radio"]:checked + label {
    color: black;
    border: 1px solid var(--paars);
}
label {
    font-weight: 500;
    cursor: pointer;
    /* color: #858585; */
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: 4px; */
    text-align: center;
    padding: .3rem 0 .8rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    /* font-size: 10px; */
}
label img {
    height: 22px;
}
</style>