<template>
    <div class="color-selector">
        <div class="colors d-flex">
            <div class="bolletje selected me-2" :style="{backgroundColor: colorRef}">
                <img class="check" src="@/assets/check-icon.svg">
            </div>
            <div class="options gap-2">
                <div 
                    v-for="color in notTheSelectedColors" 
                    :key="color" 
                    class="bolletje" 
                    :style="{backgroundColor: color}" 
                    @click="handleColorChange(color)"
                ></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import patchData from '@/composables/patchData';

const props = defineProps({
    color: String,
    clientId: String
})

const colors = ref(['#F8D84A', '#C2B5ED', '#F09D37', '#EE732F', '#EB592A']);
const colorRef = ref(props.color)

const notTheSelectedColors = computed(() => {
    return colors.value.filter(color => color !== colorRef.value);
}) 

function handleColorChange(color) {
    colorRef.value = color;
    patchData('clients', props.clientId, {color: colorRef.value})
}
</script>
<style scoped>
.bolletje {
    height: 15px;
    width: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.color-selector {
    width: fit-content;
}
.color-selector:hover {
    box-shadow: var(--bs);
    width: fit-content;
    padding: .5rem 1rem;
    margin-left: -1rem;
    border-radius: 20px;
}
.options {
    display: none;
}
.color-selector:hover .options {
    display: flex;
}   
.color-selector:hover .check {
    display: inline;
}  
.check {
    margin-left: 1px;
    margin-top: 1px;
    display: none;
}
</style>