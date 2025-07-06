<template>
  <main class="container" aria-label="Address List">
<<<<<<< Updated upstream
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go Back">
      Go back
    </router-link>
=======
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go Back">Go back</router-link>
>>>>>>> Stashed changes
    <h1 aria-label="Address List">Address List</h1>
    <div class="list-group">
      <a
        href="#"
        v-for="address in addresses"
        :key="address.id"
        class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center"
        :aria-current="address.id === selectedAddressId ? 'page' : undefined"
        tabindex="0"
<<<<<<< Updated upstream
        @focus="() => (selectedAddressId = address.id)"
        @click="() => viewInspections(address.id, true)"
        aria-label="Address"
      >
        {{ address.street }}, {{ address.city }}
        <button class="btn btn-primary" @click.stop="() => viewInspections(address.id, true)">
          View Inspections
        </button>
=======
        @focus="selectedAddressId = address.id"
        @click="viewInspections(address.id, true)"
        aria-label="Address"
      >
        {{ address.street }}, {{ address.city }}
        <button class="btn btn-primary" @click="viewInspections(address.id, true)" aria-label="View Inspections">View Inspections</button>
>>>>>>> Stashed changes
      </a>
    </div>
  </main>
</template>

<<<<<<< Updated upstream
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const addresses = ref([])
const selectedAddressId = ref(null)

const viewInspections = (id, completion) => {
  store.commit('changeAddress', id)
  store.commit('toggleCompletion', completion)
  router.push({ name: 'inspections' })
}

const fetchAddresses = async () => {
  try {
    store.commit('toggleCompletion', true)

    const { data } = await axios.get(
      'https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26',
      {
=======
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
>>>>>>> Stashed changes
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
        }
<<<<<<< Updated upstream
      }
    )

    const userId = store.getters.userID
    const completionStatus = store.getters.completion

    // Filter addresses
    const filtered = data.record.addresses.filter((address) => {
      if (!address.inspections) return false
      return address.inspections.some(
        (i) => i.inspector === userId && i.completion === completionStatus
      )
    })

    addresses.value = filtered
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchAddresses()
})
</script>
=======
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
>>>>>>> Stashed changes
