<template >
    <div class="search d-flex align-items-center me-auto">
        <img src="@/assets/search-icon.svg">
        <input type="text" v-model="searchterm" placeholder="Search client">
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useDataStore } from "@/stores/data";

// Refs
const { searchterm } = storeToRefs(useDataStore());
</script>
<style scoped>
.search {
    border: 1px solid var(--border);
    border-radius: var(--br);
    padding: 0 1rem;
    outline: none;
    background-color: transparent;
    width: 270px;
}
.search input {
    padding: .5rem 1rem;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 15px;
    color: #6C757D;
}

@media (max-width: 768px) {
    .search {
        max-width: 50%;
        padding: .2rem 1rem;
    }
}
</style>