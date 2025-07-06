<template>
  <main class="container" aria-label="Address List">
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go Back">Go back</router-link>
    <h1 aria-label="Address List">Address List</h1>
    <div class="list-group">
      <a
        href="#"
        v-for="address in addresses"
        :key="address.id"
        class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center"
        :aria-current="address.id === selectedAddressId ? 'page' : undefined"
        tabindex="0"
        @focus="selectedAddressId = address.id"
        @click="viewInspections(address.id, true)"
        aria-label="Address"
      >
        {{ address.street }}, {{ address.city }}
        <button class="btn btn-primary" @click="viewInspections(address.id, true)" aria-label="View Inspections">View Inspections</button>
      </a>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import store from '../store/store.js';

export default {
  name: "AddressList",
  data() {
    return {
      addresses: [],
      selectedAddressId: null //warning fix
    };
  },
  async created() {
    store.commit('toggleCompletion', true);

    try {
      const response = await axios.get('https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26', {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
        }
      });

      this.addresses = response.data.record.addresses;

      for (let i = 0; i < response.data.record.addresses.length; i++) {
        let address = response.data.record.addresses[i];
        if (address.inspections === null || address.inspections === undefined) continue;

        let found = false;
        for (let j = 0; j < address.inspections.length; j++) {
          let inspection = address.inspections[j];
          if (
            inspection.inspector === store.getters.userID &&
            inspection.completion === store.getters.completion
          ) {
            found = true;
            break;
          }
        }

        if (!found) {
          response.data.record.addresses.splice(i, 1);
          i--;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async viewInspections(id, completion) {
      try {
        store.commit("changeAddress", id);
        store.commit("toggleCompletion", completion);
        this.$router.push({ name: 'inspections' });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
