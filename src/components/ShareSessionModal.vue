<template >
    <div class="modal fade" id="shareSessionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="shareSessionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-header">
                    <h4 class="modal-title" id="shareSessionModalLabel">Share this session with</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group p-2" >
                        <ShareSessionListItem 
                            v-for="colleague in colleagues" 
                            :key="colleague.user_id" 
                            :colleague="colleague" 
                            @addColleague="addColleague" 
                            @removeColleague="removeColleague"
                            :addedColleaguesIds="addedColleaguesIds"
                        />
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="handleConfirm()" data-bs-dismiss="modal" class="btn btn-dark border-0">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import ShareSessionListItem from '@/components/ShareSessionListItem.vue'

import { useSessionStore } from "@/stores/session";
import { useUserStore } from "@/stores/user";

import patchData from "@/composables/patchData";

const { sessionToBePatched } = storeToRefs(useSessionStore())
const { users, user } = storeToRefs(useUserStore())
const addedColleaguesIds = ref([]) // Sla id's op van collega's waarmee sessie gedeeld wordt

const colleagues = computed(() => {
    return users.value.filter(colleague => +colleague.user_id !== user.value.user_id)
})

function addColleague(id) {
    addedColleaguesIds.value.push(id);
}

function removeColleague(id) {
    const index = addedColleaguesIds.value.indexOf(id);
    addedColleaguesIds.value.splice(index, 1);
}

watchEffect(async () => {
    
    if (sessionToBePatched.value.shared_with) {
        addedColleaguesIds.value = sessionToBePatched.value.shared_with
    }
})

async function handleConfirm() {
    
    if (addedColleaguesIds.value.length) {
        await patchData('sessions', sessionToBePatched.value.session_id, {shared_with: JSON.stringify(addedColleaguesIds.value)})
    } else {
        await patchData('sessions', sessionToBePatched.value.session_id, {shared_with: JSON.stringify([])})
    }

    addedColleaguesIds.value = [];
}
</script>
<style scoped>
.modal-content {
    border-radius: var(--br);
    border: none;
}
.modal-header, .modal-footer {
    border: none;
}
.modal-footer button {
    background-color: var(--paars);
    padding: .5rem 1.5rem;
    border-radius: var(--br);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: .3rem;
}
.list-group {
    box-shadow: none;
    border: 1px solid var(--border);
}
</style>