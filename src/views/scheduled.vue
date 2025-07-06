<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store/store.js';

// Routing
const router = useRouter();

// Reactieve data
const addresses = ref([]);
store.commit('toggleCompletion', false); // scheduled = false

onMounted(async () => {
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    const rawAddresses = response.data.record.addresses;

    const filtered = rawAddresses.filter(address => {
      if (!Array.isArray(address.inspections)) return false;

      return address.inspections.some(inspection =>
        inspection.inspector === store.getters.userID &&
        inspection.completion === store.getters.completion
      );
    });

    addresses.value = filtered;
  } catch (err) {
    console.error('Fout bij ophalen van adressen:', err);
  }
});

// Navigatie naar inspecties
function viewInspections(id, completion) {
  store.commit('changeAddress', id);
  store.commit('toggleCompletion', completion);
  router.push({ name: 'inspections' });
}
</script>

<template>
  <main class="container">
<<<<<<< Updated upstream
    <!-- Back to dashboard -->
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go back to the dashboard">Go back</router-link>
=======
    <!-- Router link to the dashboard -->
    <router-link
      :to="{ name: 'home' }"
      class="btn btn-danger"
      aria-label="Go back to the dashboard"
    >
      Go back
    </router-link>

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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
=======
>>>>>>> Stashed changes
