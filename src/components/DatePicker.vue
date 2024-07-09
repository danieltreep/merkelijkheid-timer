<template>
    <div class="d-flex align-items-center dateinput me-5 ps-2">
        <img src="@/assets/date-icon.svg" class="me-2"/>
        <input type="text" name="date"  @blur="handleChange">
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { Datepicker } from 'vanillajs-datepicker';

const emit = defineEmits(['changedate'])

onMounted(() => {
    const elem = document.querySelector('input[name="date"]');
    const datepicker = new Datepicker(elem, { // ...options
        format: 'dd-mm-yyyy'
    });

    const today = new Date();
    const formattedDate = formatDate(today);
    elem.value = formattedDate;
})

function handleChange() {
    const elem = document.querySelector('input[name="date"]');

    emit('changedate', elem.value)
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
</script>
<style scoped>
.dateinput {
  border: 1px solid transparent;
  padding: .5rem .1rem;
  border-radius: var(--br);
  width: 125px;
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