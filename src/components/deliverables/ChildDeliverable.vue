<template>
    <div class="accordion" :id="`accordion-${deliverable.upcoming_weeks_deliverable_id}`">
        <div class="accordion-item bg-transparent border-0">
            <div class="accordion-header position-relative px-4 pe-3" :id="`heading-${deliverable.upcoming_weeks_deliverable_id}`" >
                <button 
                    v-if="deliverable.children.length > 0" 
                    class="open-button bg-transparent border-0" 
                    type="button"  
                    aria-expanded="true" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="`#collapse-${deliverable.upcoming_weeks_deliverable_id}`" 
                    :aria-controls="`collapse-${deliverable.upcoming_weeks_deliverable_id}`">
                    <img src="@/assets/chevron-icon.svg" alt="arrow-down" class="ms-2">
                </button>
                <div class="d-flex align-items-center">
                    <DeliverableDone :deliverable="deliverableNextUp" @updated="emit('updated')" />
                    <DeliverableLogo :deliverable="deliverable" v-if="displayLogo !== false" />
                </div>
                <div class="d-flex flex-column justify-content-center align-items-start ms-3 cursor-pointer" data-bs-toggle="collapse" :data-bs-target="`#collapse-${deliverable.upcoming_weeks_deliverable_id}`" :aria-controls="`collapse-${deliverable.upcoming_weeks_deliverable_id}`">
                    <p class="mb-1 parent_deliverable" v-if="deliverable.deliverable_title !== deliverableNextUp.deliverable_title">{{ deliverable.deliverable_title }}</p>
                    <p class="mb-0">{{ deliverableNextUp.deliverable_title }}</p>
                </div>

                <div class="ms-auto d-flex align-items-center">
                    <DeliverableLink :deliverable="deliverableNextUp" v-if="deliverableNextUp.is_completed_by_user === '1'" />
                    <DeliverableDate :deliverable="deliverableNextUp" />
                    <DeliverableNotes :deliverable="deliverableNextUp" v-if="deliverableNextUp.instructions" />
                    <StartTimerButton :deliverable="deliverableNextUp" v-if="deliverableNextUp.is_completed_by_user === '0'" />
                </div>
            </div>
            <div 
                :id="`collapse-${deliverable.upcoming_weeks_deliverable_id}`" 
                class="accordion-collapse collapse" 
                :aria-labelledby="`heading-${deliverable.upcoming_weeks_deliverable_id}`" 
                :data-bs-parent="`#accordion-${deliverable.upcoming_weeks_deliverable_id}`"
            >
                <div class="accordion-body ps-4">
                    <p class="parent">{{ deliverable.deliverable_title }}</p>
                    <div class="d-flex align-items-center child-deliverable py-1" v-for="child in deliverable.children" :key="child.upcoming_weeks_deliverable_id">
                        <div class="child-status-wrapper me-2" :class="{'bg-paars': child.is_completed_by_user === '1', 'bg-groen': child.is_done === '1'}">
                            <div class="child-status"></div>
                        </div>
                        <p>{{ child.deliverable_title }}</p>

                        <div class="ms-auto d-flex align-items-center">
                            <DeliverableLinkSmall :deliverable="child" v-if="child.is_completed_by_user === '1' && child.assignee_user_id === currentUser.user_id" />
    
                            <div class="ms-auto avatar-wrapper" :class="{'current-user': currentUser.user_id === child.assignee_user_id}">
                                <img v-if="getUserPhoto(child.assignee_user_id)" :src="getUserPhoto(child.assignee_user_id)?.photo" alt="user-photo" class="avatar" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

// Components
import DeliverableDone from './DeliverableDone.vue';
import DeliverableLogo from './DeliverableLogo.vue';
import DeliverableLink from './DeliverableLink.vue';
import DeliverableLinkSmall from './DeliverableLinkSmall.vue';
import DeliverableNotes from './DeliverableNotes.vue';

// Stores
import { useUserStore } from '@/stores/user';

// Composables
import { dateToDDMMYYYY, isDatePassed } from '@/composables/functions';
import DeliverableDate from './DeliverableDate.vue';
import StartTimerButton from './StartTimerButton.vue';

const { users, currentUser } = storeToRefs(useUserStore());
const displayLogo = ref(false);

const props = defineProps({
    deliverable: Object,
    timerRunning: Boolean
})

const emit = defineEmits(['updated', 'startTimer']);

function getUserPhoto(user_id) {
    if (users.value) {
        const user = users.value?.find(user => user.user_id === user_id);
        return user;
    }
}

const deliverableNextUp = computed(() => {

    // Filter op deliverables die nog niet gedaan zijn en de huidige gebruiker is de assignee
    const children = props.deliverable?.children.filter(child => child.is_done === '0' && +child.assignee_user_id === +currentUser.value.user_id);

    // Als er geen children zijn waar de huidige gebruiker de assignee is, return de hoofddeliverable
    if (children.length === 0) {
        return props.deliverable;
    }

    // Filter op deliverables die nog niet gedaan zijn door de huidige gebruiker
    const childrenNotDone = children.filter(child => child.is_completed_by_user === '0');

    // Als er children zijn die nog niet gedaan zijn, return het eerste child dat nog niet gedaan is
    if (childrenNotDone.length > 0) {
        return childrenNotDone[0];
    } else {
        return children[children.length - 1];
    } 
})


</script>

<style scoped>
.accordion-header {
    height: 72px;
    align-items: center;
    background-color: white;
    border: 1px solid var(--border-licht);
    border-radius: var(--br);
    display: grid;
    grid-template-columns: minmax(10px, auto) 1fr auto;
    font-size: 14px;
    line-height: 1;

}
.accordion-body {
    background-color: transparent;
}
.child-status-wrapper {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid var(--border-licht);
    padding: 3px;
    position: relative;
    z-index: 1;
}

.child-status-wrapper::after {
    content: '';
    position: absolute;
    bottom: calc(100% + 1px);
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 9px;
    background-color: var(--border-licht);
    z-index: -1;
    border-radius: 50%;
}
.child-deliverable {
    font-size: 14px;
    height: 30px;
}
.child-deliverable:first-of-type .child-status-wrapper::after {
    height: 34px;
}
.child-status {
    background-color: transparent;
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
.bg-paars {
    border: 1px solid var(--paars);
}
.bg-paars .child-status {
    background-color: var(--paars);
}
.bg-groen {
    border: 1px solid var(--groen);
}
.bg-groen .child-status {
    background-color: var(--groen);
}

.avatar {
    height: 20px;
    width: 20px;
}
.parent_deliverable {
    font-size: 10px;
    color: var(--body);
    line-height: 1;
    font-weight: 500;
    margin-bottom: 2px;
}
.parent {
    font-size: 10px;
    color: var(--body);
    line-height: 1;
    font-weight: 500;
    margin-bottom: 2px;
    margin-left: 28px;
}
.avatar-wrapper {
    border: 1px solid transparent;
    width: 26px;
    height: 26px;
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.current-user {
    border: 2px solid var(--paars);
}
.current {
    font-size: 12px;
    background-color: var(--groen);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
}
.open-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
}
.play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: .7rem .5rem;
    border-radius: 8px;
    width: 40px;
}
button:hover {
    background-color: var(--hover);
}

</style>