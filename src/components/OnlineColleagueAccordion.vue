<template>
  <div class="accordion-item" >
    <div class="accordion-header py-3 py-md-2 ">
      <div class="position-relative d-flex align-items-center">
        <p class="mb-0 title">{{ title }} </p>
        <button class=" show-content-button d-flex align-items-center ms-auto gap-2 justify-content-center" :class="open ? '' : 'collapsed'" type="button" data-bs-toggle="collapse" :data-bs-target="`#accordion-${id}`" aria-expanded="true" :aria-controls="`accordion-${id}`">
          {{ usersWithThisStatus.length }}
          <img src="@/assets/chevron-icon.svg" alt="">
        </button>
      </div>
    </div>
    <div :id="`accordion-${id}`" class="accordion-collapse" :class="open ? 'show' : 'collapse'">
      <div class="accordion-body p-0">
        <div class="avatar-container pe-4 d-flex">
          <div v-for="user in usersWithThisStatus" :key="user.user_id" class="avatar-wrapper">
            <div class="avatar position-relative">
              <img :src="user.photo" alt="">
              <div class="indicator" v-if="checkIfOnline(user)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from "pinia";
import { useUserStore } from '@/stores/user'
import { useSessionStore } from '@/stores/session'

const { users } = storeToRefs(useUserStore())
const { allRunningSessions } = storeToRefs(useSessionStore())

const props = defineProps({
  title: String,
  id: String,
  statuses: Array,
  open: Boolean
})

const usersWithThisStatus = computed(() => {

  if (props.title === '👻 Unknown') {
    const userIdsOfStatuses = props.statuses?.map(status => String(status.user_id));
    return users?.value.filter(user => !userIdsOfStatuses.includes(user.user_id));
  }
  return props.statuses?.filter(status => status.location === props.title || status.status === props.title)
})

const checkIfOnline = (user) => {
  return allRunningSessions.value.some(session => +session.user_id === +user.user_id)
}
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
button img {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}
button.collapsed img {
  transform: rotate(0deg);
}
.avatar-container::-webkit-scrollbar {
  display: none;
}
.avatar-container {
  overflow-x: scroll; 
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.accordion-body {
  position: relative;
  /* width: 100%; */
}
.accordion-body::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background-color: red;
  background: linear-gradient(to right, transparent, var(--bg));
}
</style>