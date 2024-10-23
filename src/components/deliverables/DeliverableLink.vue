<template>
    <div class="position-relative d-flex justify-content-end me-2" >
        <div class="link" v-if="deliverable.link" @click="showTooltip = !showTooltip">
            <img src="@/assets/icon-file.svg" class="me-2">
            {{ formatLink(deliverable.link)}}
        </div>  
        <button class="add-link" v-else @click="showTooltip = !showTooltip">
            <img src="@/assets/icon-plus.svg" class="me-2">
            Add link
        </button>
        <div class="add-link-tooltip d-flex gap-2 p-2" v-if="showTooltip">
            <input type="text" class="form-control" v-model="link" @blur="addLink" placeholder="Add link here">
            
            <a class="open-link d-flex align-items-center gap-3" target="_blank" :href="link" v-if="link.length">
                <img src="@/assets/icon-open-link.svg">
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Composables
import patchData from '@/composables/patchData'

// Props
const props = defineProps({
    deliverable: Object
})

// Refs
const link = ref(props.deliverable.link || '')
const showTooltip = ref(false)

function formatLink(link) {
    if (link.length > 20) {
        return `${link.slice(8, 12)}...${link.slice(-6)}`;
    }
    return link.slice(8);
}


// Methods
async function addLink() {
    
    await patchData('deliverables', props.deliverable.deliverable_id, {
        link: link.value
    })
}

function handleClickOutside(event) {
    const tooltip = document.querySelector('.add-link-tooltip')
    if (tooltip && !tooltip.contains(event.target) && !event.target.classList.contains('link') && !event.target.classList.contains('add-link')) {
        showTooltip.value = false
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped>
.link,
.add-link {
    background-color: var(--bg);
    border-radius: 30px;
    padding: .2rem 1rem;
    height: 30px;
    width: fit-content;
    display: flex;
    align-items: center;
    border: none;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
}
.link:hover,
.add-link:hover {
    background-color: var(--hover);
}
.open-link {
    border-radius: 8px;
    height: 36.5px;
    padding-inline: 1rem;
    background-color: var(--bg);
    color: white;
    font-weight: 500;
    border: none;
    font-size: 14px;
}
.open-link img {
    filter: invert(100%);
    -webkit-filter: invert(100%);
}
.add-link-tooltip {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 100%;
    width: 250px;
    background-color: white;
    border-radius: var(--br);
    box-shadow: var(--bs);
}
.add-link-tooltip input {
    font-size: 14px;
}
.add-link-tooltip input::placeholder {
    color: grey;
}
</style>