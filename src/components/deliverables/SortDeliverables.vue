<template>
    <div class="d-flex align-items-center gap-2">
        <p>Sort by</p>
        <select name="sort-deliverables" id="sort-deliverables" @change="$emit('sort', $event.target.value)">
            <option value="client">Client</option>
            <option value="date">Date</option>
        </select>
    </div>
</template>

<script setup>
const emit = defineEmits(['sort']);
</script>

<style scoped>
select {
    border: 1px solid var(--border);
    height: 30px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 30px;
    padding: 0 24px 0 12px;
    background-image: url('@/assets/chevron-icon.svg');
    background-size: 8px;
    background-repeat: no-repeat;
    background-position: right 10px center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
}


p {
    font-size: 12px;
    font-weight: 500;
    color: #858585;
}
</style>