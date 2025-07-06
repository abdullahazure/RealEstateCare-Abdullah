<template>
  <main class="container" aria-label="Address List">
    <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go Back">
      Go back
    </router-link>
    <h1 aria-label="Address List">Address List</h1>
    <div class="list-group">
      <a
        href="#"
        v-for="address in addresses"
        :key="address.id"
        class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center"
        :aria-current="address.id === selectedAddressId ? 'page' : undefined"
        tabindex="0"
        @focus="() => (selectedAddressId = address.id)"
        @click="() => viewInspections(address.id, true)"
        aria-label="Address"
      >
        {{ address.street }}, {{ address.city }}
        <button class="btn btn-primary" @click.stop="() => viewInspections(address.id, true)">
          View Inspections
        </button>
      </a>
    </div>
  </main>
</template>

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
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
        }
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