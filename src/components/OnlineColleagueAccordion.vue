<template>
     <div class="accordion-item" >
        <div class="accordion-header pe-2 py-3 py-md-2 ">
            <div class="position-relative d-flex align-items-center">
            <p class="mb-0 title">{{ title }} </p>
            
            <button class=" show-content-button d-flex align-items-center me-md-4 ms-2 gap-2 justify-content-center collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#accordion-${id}`" aria-expanded="true" :aria-controls="`accordion-${id}`">
                    1
                    <img src="@/assets/chevron-icon.svg" alt="">
                </button>
            </div>
        </div>
        <div :id="`accordion-${id}`" class="accordion-collapse collapse">
            <div class="accordion-body p-0">
            <div class="avatar-wrapper">
                <div class="avatar position-relative">
                <img src="@/assets/mens.png" alt="">
                <div class="indicator"></div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    id: String

})
</script>

<style scoped>
.avatar-wrapper img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 1px solid white;
}

.avatar-wrapper {
  margin-right: -10px;
}

.indicator {
  height: 10px; 
  width: 10px;
  border-radius: 50%;
  background-color: var(--groen);
  border: 1.5px solid white;
  position: absolute;
  left: 0;
  bottom: 0;
}

.show-content-button {
  border: 1px solid var(--border);
  width: 50px;
  border-radius: 30px;
  font-size: 12px;
  background-color: transparent;
  padding: .2rem;
}
.title {
  font-size: 14px;
  font-weight: 500;
}
.accordion-item {
  background-color: transparent;
  border: none;
  margin-top: 1rem;
}
</style>