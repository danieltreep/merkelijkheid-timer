<template>
    <div class="modal fade" id="deliverableInstructionsModal" tabindex="-1" aria-labelledby="deliverableInstructionsModalLabel">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="deliverableInstructionsModalLabel">Notes</h5>
                </div>
                <div class="modal-body">
                    <textarea rows="7" v-model="selectedDeliverable.instructions"></textarea>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="save px-4" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

// Stores
import { useDeliverablesStore } from '@/stores/deliverables';

const { selectedDeliverable } = storeToRefs(useDeliverablesStore());

</script>

<style scoped>
.modal {
    font-size: 15px;
}
textarea {
    width: 100%;
    background-color: var(--bg);
    border: none;
    border-radius: var(--br);
    padding: 1rem;
    resize: none;
}
textarea:focus-within {
    outline: 1px solid var(--paars);
}
.save {
    border: 1px solid var(--paars);
    background-color: var(--paars);
    border-radius: 30px;
    height: 45px;
    padding-inline: 1rem;
    color: white;
    font-size: 14px;
    font-weight: 500;
}
.close {
    border: 1px solid var(--paars);
    background-color: transparent;
    border-radius: 30px;
    height: 45px;
    padding-inline: 1.5rem;
    color: var(--paars);
    font-size: 14px;
    font-weight: 500;
}
</style>