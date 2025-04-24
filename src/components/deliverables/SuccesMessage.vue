<template>
    <li class="success-message deliverable list-group-item p-3 d-flex align-items-center justify-content-center">
        <p>{{ succesMessage }}</p>
    </li>
</template>

<script setup>
import { computed } from 'vue';

const successMessages = [
    'Amazing!', 
    'Hell yeah!', 
    'You rock! 🤟', 
    "BOOM! Nailed it!! 💥",
    'Keep it up!',  
    'Superb!', 
    'High five! 🙏',
    "You're on fire! 🔥",
    "Go get 'em!",
    "You’re a star! ⭐",
    "Victory dance!",
    'More epic than a llama in sunglasses!',
    'What would we do without you?',
    'Task slayer! 🥷',
    'Like a boss! 😎',
    'You made it look easy!',
    'Faster than a squirrel on espresso!',
    'Smashed that like a piñata at a party!',
    'Check, double check! ✅',
    'Wrapped that up like a Christmas present!',
    'Ties is trots op je!',
    'Jens doet een dansje',
    'Tal doet van blijdschap de BBQ aan 🍖',
    '💜💜💜',
    'Mission accomplished.',
    'Pief, poef, paf. Deze taak is af.',
    'Purrfect! 🐱',
    'You deserve a cookie! 🍪',
    'That was a piece of cake! 🍰',
    'That took you a while...'
]

const succesMessage = computed(() => successMessages[Math.floor(Math.random() * successMessages.length)])

</script>

<style scoped>
.deliverable.success-message {
    border: 1px solid var(--paars);
    color: var(--paars);
    font-weight: 500;
}
</style>