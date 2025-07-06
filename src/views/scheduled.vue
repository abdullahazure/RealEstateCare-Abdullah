<template>
  <main class="container">
    <!-- Back to dashboard -->
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go back to the dashboard">Go back</router-link>
    <h1>Address List</h1>

    <div class="list-group">
      <a
        href="#"
        v-for="address in addresses"
        :key="address.id"
        class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center"
        aria-label="List of addresses"
      >
        {{ address.street }}, {{ address.city }}
        <button
          class="btn btn-primary"
          @click="viewInspections(address.id, false)"
          aria-label="View inspections for this address"
        >
          View Inspections
        </button>
      </a>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store/store.js';

const router = useRouter();
const addresses = ref([]);

// Reset completion filter globally
store.commit('toggleCompletion', false);

const viewInspections = async (id, completion) => {
  try {
    store.commit('changeAddress', id);
    store.commit('toggleCompletion', completion);
    router.push({ name: 'inspections' });
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    const allAddresses = response.data.record.addresses || [];
    const filtered = allAddresses.filter(address => {
      if (!address.inspections) return false;

      return address.inspections.some(
        i => i.inspector === store.getters.userID && i.completion === store.getters.completion
      );
    });

    addresses.value = filtered;
  } catch (error) {
    console.error(error);
  }
});
</script>