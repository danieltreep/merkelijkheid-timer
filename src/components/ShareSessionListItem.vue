<template >
    <li 
        class="d-flex align-items-center gap-2 colleague" 
        :class="added ? 'added' : ''"
        @click="handleClick"
    >
        <div class="avatar-wrapper" :class="added ? 'added' : ''">
            <img class="avatar-inline" :src="colleague.photo" >
        </div>
        {{ colleague.username }}
        <img class="ms-auto me-2 cross-icon" v-if="added" src="@/assets/cross-icon.svg" alt="">
    </li>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useSessionStore } from '@/stores/session'

const props = defineProps({
    colleague: Object,
})

const { sessionToBePatched } = storeToRefs(useSessionStore())

const added = ref(false)

const emit = defineEmits(['addColleague', 'removeColleague'])

function handleClick() {

    // console.log(props.isSharedWith)
    if (added.value) {
        emit('removeColleague', props.colleague.user_id)
    } else {
        emit('addColleague', props.colleague.user_id)
    }
    
    added.value = !added.value
}

watchEffect(async () => {

    if (sessionToBePatched.value.shared_with) {
        // const sharedWithArray = JSON.parse(sessionToBePatched.value.shared_with)
        // console.log('array', sharedWithArray)
        added.value = sessionToBePatched.value.shared_with.indexOf(props.colleague.user_id) > -1
    } else {
        added.value = false;
    }
})
</script>
<style scoped>
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
/* .added {
    opacity: .7;
} */
.colleague:hover .avatar-wrapper {
    border: 2px solid var(--paars);
}
.avatar-wrapper.added {
    border: 2px solid var(--paars);
}
</style>