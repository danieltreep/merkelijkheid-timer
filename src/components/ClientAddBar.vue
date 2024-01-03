<template>
    <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Client name"
          aria-label="Client name"
          aria-describedby="basic-addon1"
          v-model="clientName"
        />
        
        <AddButton 
            :disabled="!clientName" 
            text="Add client" 
            table="clients" 
            :data="{
                client_name: clientName,
               
            }" 
            @reset-values="resetValues"/>
      </div>
</template>
<script setup>
import { ref } from "vue";
import AddButton from "@/components/AddButton.vue";

const clientName = ref("");

function resetValues() {
    clientName.value = '';
}

</script>