<template>
    <div class="d-flex align-items-center dateinput ps-2">
        <img src="@/assets/date-icon.svg" class="me-2"/>
        <input type="text" name="date" @blur="handleChange">
    </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { Datepicker } from 'vanillajs-datepicker';

// Stores
import { useSessionStore } from '@/stores/session'

// Composables
import { formatDate } from '@/composables/functions'

// Props and emits
const emit = defineEmits(['changedate'])

const props = defineProps({
    today: Boolean
})

// Refs
const { sessionToBePatched } = storeToRefs(useSessionStore())

// Methods
function handleChange() {
    const elem = document.querySelector('input[name=date]');
    emit('changedate', elem.value)
}

// Lifecycle
onMounted(() => {
    const elem = document.querySelector('input[name=date]');
    const datepicker = new Datepicker(elem, { // ...options
        format: 'dd-mm-yyyy'
    });

    if (props.today) {
        const today = new Date();
        const formattedDate = formatDate(today);
        elem.value = formattedDate;
    } 
})

// Watchers
watch(sessionToBePatched, () => {

    if (!props.today) {
        const elem = document.querySelector('input[name=date]');
        const formattedDate = formatDate(new Date(sessionToBePatched.value.created_at));
        elem.value = formattedDate;
    }
})

</script>
<style scoped>
.dateinput {
  border: 1px solid transparent;
  padding: .5rem .1rem;
  border-radius: var(--br);
}
.dateinput:hover {
  border: 1px solid var(--hover);
}
input {
    border: none;
    outline: none;
    background-color: transparent;
}
</style>