<template>
  <main class="container">
    <router-link :to="{ name: archive }" class="btn btn-danger" aria-label="Go back">
      Go back
    </router-link>

    <h1 class="my-3">Inspections {{ address }}</h1>

    <div v-if="inspections.length" class="list-group gap-3">
      <div
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        v-for="inspection in inspections"
        :key="inspection.id"
      >
        <div>
          <p>Inspection ID: {{ inspection.id }}</p>
          <p>Date: {{ inspection.date }}</p>
          <div
            class="badge"
            :class="{
              'text-bg-success': inspection.completion,
              'text-bg-danger': !inspection.completion
            }"
            aria-label="Inspection status"
          >
            {{ inspection.completion ? 'Completed' : 'In progress' }}
          </div>
        </div>

        <button
          class="btn btn-primary"
          @click="goToInspection(inspection.id)"
          aria-label="Go to Inspection"
        >
          Go to Inspection
        </button>
      </div>
    </div>

    <div v-else class="alert alert-info mt-4">
      Geen inspecties gevonden voor dit adres.
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import store from '../store/store.js'

const router = useRouter()

const inspections = ref([])
const addressId = ref('')
const address = ref('')
const archive = ref('scheduled')

function goToInspection(inspectionId) {
  store.commit('changeInspection', inspectionId)
  store.commit('changeAddress', addressId.value)
  router.push({ name: 'inspection' })
}

onBeforeMount(async () => {
  addressId.value = store.getters.address
  archive.value = store.getters.completion ? 'completed' : 'scheduled'

  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    })

    const allAddresses = response.data.record.addresses
    const match = allAddresses.find(a => a.id === addressId.value)

    if (match) {
      inspections.value = match.inspections.filter(
        i =>
          i.completion === store.getters.completion &&
          i.inspector === store.getters.userID
      )
      address.value = `${match.street}, ${match.city}`
    }
  } catch (error) {
    console.error('❌ Fout bij ophalen van inspecties:', error)
  }
})
</script>
