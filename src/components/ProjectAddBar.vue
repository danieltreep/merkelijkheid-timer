<template>
    <div class="input-group mb-3">
        <!-- <span class="input-group-text" id="basic-addon1">Project name</span> -->
        <input
          type="text"
          class="form-control"
          placeholder="Project name"
          aria-label="Project name"
          aria-describedby="basic-addon1"
          v-model="projectName"
        />
        <select class="form-select" v-model="clientId">
          <option disabled selected value="Client">Client</option>
          <option
            v-for="client in clients"
            :key="client.id"
            :value="client.id"
          >
            {{ client.client_name }}
          </option>
        </select>

        <AddButton 
          :disabled="!projectName || !clientId" 
          text="Add project" 
          table="projects" 
          :data="{
            project_name: projectName,
            client_id: clientId,
          }" 
          @reset-values="resetValues"/>
      </div>
</template>
<script setup>
import { ref } from "vue";
import AddButton from "@/components/AddButton.vue";

defineProps({
  clients: Array
})

const projectName = ref("");
const clientId = ref("");

function resetValues() {
    projectName.value = '';
    clientId.value = '';
}

</script>